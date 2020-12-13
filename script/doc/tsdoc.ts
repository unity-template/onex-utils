import fileList from 'stats-filelist';
import fs from 'fs-extra';
import path from 'path';
import { Stats } from 'fs';
import { generator } from './tsdoc-to-md';


const basePath = path.join(__dirname, '..', '..');
const docPath = path.join(basePath, './doc');
const readmePath = path.join(docPath, 'README.md');

interface FileStats extends Stats{
  name: string;
  path: string;
  fullPath: string;
  dirPath: string;
  extension: string;
}

function getTargetFiles() {
  const utilsFileStatsList = fileList.getSync('./src/utils') as FileStats[];
  const targetList: FileStats[] = [];

  for (const utilFileStats of utilsFileStatsList) {
    if (utilFileStats.isFile() && utilFileStats.name !== 'index.ts') {
      targetList.push(utilFileStats);
    }
  }
  return targetList;
}

interface ScopeInfo {
  bizName: string;
  fileName: string;
}
function getScopeList(file: FileStats): ScopeInfo {
  const filePath = file.fullPath;
  const relativePath = path.relative(basePath, filePath);
  const [,,bizName, fileName] = relativePath.split('/');
  return {
    bizName,
    fileName,
  };
}

function generatorSingleDocs(file: FileStats, scopeInfo: ScopeInfo) {
  // TODO: 生成scopeInfo相关信息
  if (file.isFile()) {
    return generator(file.fullPath);
  }
  return '';
}

function build() {
  const targetList = getTargetFiles();
  let markdown = '';
  for (const file of targetList) {
    const scopeInfo = getScopeList(file);
    markdown += generatorSingleDocs(file, scopeInfo);
  }
  fs.ensureFileSync(readmePath);
  fs.writeFile(readmePath, markdown);
}

build();
