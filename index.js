'use strict';

module.exports = function(content, file, conf) {
  if (!file.isText()) { // 非文本文件原样返回
    return content;
  }

  conf = conf || {}
  return processFileContents(fileContents, conf.inDevelopmentMode);
};

function processFileContents(fileContents, inDevelopmentMode) {
  var data = fileContents;

  data = processFileContentsForBlock(
    data,
    '<!-- dev -->',
    '<!-- /dev -->',
    /* commentOutContentsInBlock */
    !inDevelopmentMode);

  data = processFileContentsForBlock(
    data,
    '<!-- !dev -->',
    '<!-- /!dev -->',
    /* commentOutContentsInBlock */
    inDevelopmentMode);

  return new Buffer(data);
}

function processFileContentsForBlock(
  fileContents,
  startBlockComment,
  endBlockComment,
  commentOutContentsInBlock) {
  var i;

  var stripHtmlCommentRegex = /<!--(.*)-->/;

  var inBlock = false;
  var lines = fileContents.split('\n');

  for (i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (line.indexOf(endBlockComment) >= 0) {
      inBlock = false;
    }

    if (inBlock) {
      var match = line.match(stripHtmlCommentRegex);
      if (!commentOutContentsInBlock) {
        if (match) {
          lines[i] = match[1].trim();
        }
      } else {
        if (!match) { //if isn't already commented out
          lines[i] = '<!-- {0} -->'.replace('{0}', line);
        }
      }
    }

    if ((line.indexOf(startBlockComment) >= 0) || (line.indexOf(endBlockComment) >= 0)) {
      inBlock = (line.indexOf(startBlockComment) >= 0);
    }
  }

  return lines.join('\n');
}