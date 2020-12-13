import * as ts from 'typescript';
import * as tsdoc from '@microsoft/tsdoc';
import os from 'os';

export function generator(filePath: string): string {
  const commentList = getComment(filePath);
  let content = '';
  for (const comment of commentList) {
    content += parseTSDoc(comment);
  }
  return content;
}

interface IFoundComment {
  compilerNode: ts.Node;
  textRange: tsdoc.TextRange;
}

function getComment(file: string): IFoundComment[] {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
  };
  const program: ts.Program = ts.createProgram([file], compilerOptions);
  const compilerDiagnostics: readonly ts.Diagnostic[] = program.getSemanticDiagnostics();
  if (compilerDiagnostics.length > 0) {
    for (const diagnostic of compilerDiagnostics) {
      const message: string = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        os.EOL,
      );
      if (diagnostic.file) {
        const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!,
        );
        const formattedMessage =
          `${diagnostic.file.fileName}(${location.line + 1},${
            location.character + 1
          }): [TypeScript] ${message}`;
        console.log(formattedMessage);
      } else {
        console.log(message);
      }
    }
  }
  const sourceFile: ts.SourceFile | undefined = program.getSourceFile(file);
  if (!sourceFile) {
    throw new Error('Error retrieving source file');
  }

  const foundComments: IFoundComment[] = [];

  walkCompilerAstAndFindComments(sourceFile, '', foundComments);

  return foundComments;
}

function walkCompilerAstAndFindComments(
  node: ts.Node,
  indent: string,
  foundComments: IFoundComment[],
): void {
  // The TypeScript AST doesn't store code comments directly.  If you want to find *every* comment,
  // you would need to rescan the SourceFile tokens similar to how tsutils.forEachComment() works:
  // https://github.com/ajafff/tsutils/blob/v3.0.0/util/util.ts#L453

  // However, for this demo we are modeling a tool that discovers declarations and then analyzes their doc comments,
  // so we only care about TSDoc that would conventionally be associated with an interesting AST node.

  const buffer: string = node.getSourceFile().getFullText(); // don't use getText() here!

  // Only consider nodes that are part of a declaration form.  Without this, we could discover
  // the same comment twice (e.g. for a MethodDeclaration and its PublicKeyword).
  if (isDeclarationKind(node.kind)) {
    // Find "/** */" style comments associated with this node.
    // Note that this reinvokes the compiler's scanner -- the result is not cached.
    const comments: ts.CommentRange[] = getJSDocCommentRanges(node, buffer);

    if (comments.length > 0) {
      for (const comment of comments) {
        foundComments.push({
          compilerNode: node,
          textRange: tsdoc.TextRange.fromStringRange(
            buffer,
            comment.pos,
            comment.end,
          ),
        });
      }
    }
  }

  return node.forEachChild((child) =>
    walkCompilerAstAndFindComments(child, `${indent}  `, foundComments));
}

/**
 * Returns true if the specified SyntaxKind is part of a declaration form.
 *
 * Based on ts.isDeclarationKind() from the compiler.
 * https://github.com/microsoft/TypeScript/blob/v3.0.3/src/compiler/utilities.ts#L6382
 */
function isDeclarationKind(kind: ts.SyntaxKind): boolean {
  return (
    kind === ts.SyntaxKind.ArrowFunction ||
    kind === ts.SyntaxKind.BindingElement ||
    kind === ts.SyntaxKind.ClassDeclaration ||
    kind === ts.SyntaxKind.ClassExpression ||
    kind === ts.SyntaxKind.Constructor ||
    kind === ts.SyntaxKind.EnumDeclaration ||
    kind === ts.SyntaxKind.EnumMember ||
    kind === ts.SyntaxKind.ExportSpecifier ||
    kind === ts.SyntaxKind.FunctionDeclaration ||
    kind === ts.SyntaxKind.FunctionExpression ||
    kind === ts.SyntaxKind.GetAccessor ||
    kind === ts.SyntaxKind.ImportClause ||
    kind === ts.SyntaxKind.ImportEqualsDeclaration ||
    kind === ts.SyntaxKind.ImportSpecifier ||
    kind === ts.SyntaxKind.InterfaceDeclaration ||
    kind === ts.SyntaxKind.JsxAttribute ||
    kind === ts.SyntaxKind.MethodDeclaration ||
    kind === ts.SyntaxKind.MethodSignature ||
    kind === ts.SyntaxKind.ModuleDeclaration ||
    kind === ts.SyntaxKind.NamespaceExportDeclaration ||
    kind === ts.SyntaxKind.NamespaceImport ||
    kind === ts.SyntaxKind.Parameter ||
    kind === ts.SyntaxKind.PropertyAssignment ||
    kind === ts.SyntaxKind.PropertyDeclaration ||
    kind === ts.SyntaxKind.PropertySignature ||
    kind === ts.SyntaxKind.SetAccessor ||
    kind === ts.SyntaxKind.ShorthandPropertyAssignment ||
    kind === ts.SyntaxKind.TypeAliasDeclaration ||
    kind === ts.SyntaxKind.TypeParameter ||
    kind === ts.SyntaxKind.VariableDeclaration ||
    kind === ts.SyntaxKind.JSDocTypedefTag ||
    kind === ts.SyntaxKind.JSDocCallbackTag ||
    kind === ts.SyntaxKind.JSDocPropertyTag
  );
}

/**
 * Retrieves the JSDoc-style comments associated with a specific AST node.
 *
 * Based on ts.getJSDocCommentRanges() from the compiler.
 * https://github.com/microsoft/TypeScript/blob/v3.0.3/src/compiler/utilities.ts#L924
 */
function getJSDocCommentRanges(node: ts.Node, text: string): ts.CommentRange[] {
  const commentRanges: ts.CommentRange[] = [];

  switch (node.kind) {
    case ts.SyntaxKind.Parameter:
    case ts.SyntaxKind.TypeParameter:
    case ts.SyntaxKind.FunctionExpression:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.ParenthesizedExpression:
      commentRanges.push(
        ...(ts.getTrailingCommentRanges(text, node.pos) || []),
      );
      break;
  }
  commentRanges.push(...(ts.getLeadingCommentRanges(text, node.pos) || []));

  // True if the comment starts with '/**' but not if it is '/**/'
  return commentRanges.filter(
    (comment) =>
      text.charCodeAt(comment.pos + 1) ===
        0x2a /* ts.CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 2) ===
        0x2a /* ts.CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 3) !== 0x2f, /* ts.CharacterCodes.slash */
  );
}

function parseTSDoc(foundComment: IFoundComment): string {
  const customConfiguration: tsdoc.TSDocConfiguration = new tsdoc.TSDocConfiguration();
  const customInlineDefinition: tsdoc.TSDocTagDefinition = new tsdoc.TSDocTagDefinition(
    {
      tagName: '@customInline',
      syntaxKind: tsdoc.TSDocTagSyntaxKind.InlineTag,
      allowMultiple: true,
    },
  );

  // NOTE: Defining this causes a new DocBlock to be created under docComment.customBlocks.
  // Otherwise, a simple DocBlockTag would appear inline in the @remarks section.
  const customBlockDefinition: tsdoc.TSDocTagDefinition = new tsdoc.TSDocTagDefinition(
    {
      tagName: '@customBlock',
      syntaxKind: tsdoc.TSDocTagSyntaxKind.BlockTag,
    },
  );

  // NOTE: Defining this causes @customModifier to be removed from its section,
  // and added to the docComment.modifierTagSet
  const customModifierDefinition: tsdoc.TSDocTagDefinition = new tsdoc.TSDocTagDefinition(
    {
      tagName: '@customModifier',
      syntaxKind: tsdoc.TSDocTagSyntaxKind.ModifierTag,
    },
  );

  customConfiguration.addTagDefinitions([
    customInlineDefinition,
    customBlockDefinition,
    customModifierDefinition,
  ]);

  const tsdocParser: tsdoc.TSDocParser = new tsdoc.TSDocParser(
    customConfiguration,
  );
  const parserContext: tsdoc.ParserContext = tsdocParser.parseRange(
    foundComment.textRange,
  );

  if (parserContext.log.messages.length !== 0) {
    const sourceFile: ts.SourceFile = foundComment.compilerNode.getSourceFile();
    for (const message of parserContext.log.messages) {
      // Since we have the compiler's analysis, use it to calculate the line/column information,
      // since this is currently faster than TSDoc's TextRange.getLocation() lookup.
      const location: ts.LineAndCharacter = sourceFile.getLineAndCharacterOfPosition(
        message.textRange.pos,
      );
      const formattedMessage = `${sourceFile.fileName}(${location.line + 1},${
        location.character + 1
      }): [TSDoc] ${message}`;
      console.log(formattedMessage);
    }
  }

  if (
    parserContext.docComment.modifierTagSet.hasTag(customModifierDefinition)
  ) {
    // TODO:针对含有自定义的标签进行解析生成文档
  }
  return '';
}
