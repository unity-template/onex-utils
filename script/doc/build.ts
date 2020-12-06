import docdown from 'docdown';
import { Stats } from 'fs';
import fs from 'fs-extra';
import defaults from 'lodash.defaults';
import last from 'lodash.last';
import path from 'path';
import fileList from 'stats-filelist';
import currentGitBranch from 'current-git-branch';


const branchName = currentGitBranch();
const basePath = path.join(__dirname, '..', '..');
const docPath = path.join(basePath, 'doc');
const readmePath = path.join(docPath, 'README.md');

const config = {
  base: {
    lang: 'typescript',
    toc: 'categories',
  },
  github: {
    style: 'github',
    sublinks: [npmLink('&#x24C3;', 'See the npm package')],
  },
  site: {
    entryLink: '<a href="${entryHref}" class="fa fa-link"></a>',
    sourceLink: '[source](${sourceHref})',
    tocHref: '',
    tocLink: '',
    sublinks: [npmLink('npm package')],
  },
};

/**
 * Composes a npm link from `text` and optional `title`.
 *
 * @private
 * @param {string} text The link text.
 * @param {string} [title] The link title.
 * @returns {string} Returns the composed npm link.
 */
function npmLink(text: string, title?: string) {
  return (
    `${'<% if (name == "templateSettings" || !/^(?:methods|properties|seq)$/i.test(category)) {' +
      'print(' +
        '"['}${ text }](https://www.npmjs.com/package/lodash." + name.toLowerCase() + ` +
        `"${ title == null ? '' : ` \\"${ title }\\"` })"` +
      ');' +
    '} %>'
  );
}

/**
 * Post-process `markdown` to make adjustments.
 *
 * @private
 * @param {string} markdown The markdown to process.
 * @returns {string} Returns the processed markdown.
 */
function postProcess(markdown: string) {
  // Wrap symbol property identifiers in brackets.
  return markdown.replace(/\.(Symbol\.(?:[a-z]+[A-Z]?)+)/g, '[$1]');
}

/**
 * Generators single docs
 * @param {string} filePath
 * @param {string} type
 * @returns {string} Returns single file markdown docs with jsdoc
 */
function generatorSingleDocs(file: FileStats, type: string) {
  const options = defaults({}, config.base, config[type], {
    title: file.name,
    path: file.fullPath,
    url: `https://github.com/unity-template/utils/blob/${branchName}/${file.path}`,
  });
  return docdown(options);
}

interface FileStats extends Stats{
  name: string;
  path: string;
  fullPath: string;
  dirPath: string;
  extension: string;
}

/**
 * Creates the documentation markdown formatted for 'github' or 'site'.
 *
 * @private
 * @param {string} type The format type.
 */
function build(type) {
  let markdown = '';
  const utilsFileStatsList = fileList.getSync('./src/utils') as FileStats[];

  for (const utilFileStats of utilsFileStatsList) {
    if (utilFileStats.isFile() && utilFileStats.name !== 'index.ts') {
      markdown += generatorSingleDocs(utilFileStats, type);
    }
  }
  fs.ensureFileSync(readmePath);
  fs.writeFile(readmePath, postProcess(markdown));
}

build(last(process.argv));

