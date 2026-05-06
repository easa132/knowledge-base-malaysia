const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const baseDir = '/Users/jackieliu/knowledge-base/今通国际马来项目';
const files = [
  'README.md',
  '01-项目计划书.md',
  '02-股权与财务架构.md',
  '03-大学合作方案.md',
  '04-课程大纲.md',
  '05-补充知识库-刘桢版.md',
  '06-竞争对手调研报告.md',
  '07-TikTok-TAP-MCN市场调研.md',
  '08-微信推送服务说明.md',
  '09-马来西亚B2B机票平台与支付调研.md'
];

const fileNames = {
  'README.md': '📋 总览导航',
  '01-项目计划书.md': '📄 项目计划书',
  '02-股权与财务架构.md': '💰 股权与财务',
  '03-大学合作方案.md': '🎓 大学合作方案',
  '04-课程大纲.md': '📚 课程大纲',
  '05-补充知识库-刘桢版.md': '📖 补充知识库',
  '06-竞争对手调研报告.md': '🔍 竞争对手调研',
  '07-TikTok-TAP-MCN市场调研.md': '📱 TikTok TAP/MCN调研',
  '08-微信推送服务说明.md': '📬 微信推送服务',
  '09-马来西亚B2B机票平台与支付调研.md': '✈️ B2B机票平台调研'
};

function genNav(currentFile) {
  return files.map(f => {
    const name = fileNames[f] || f;
    if (f === currentFile) return `<li class="active"><a href="${f.replace('.md','.html')}">${name}</a></li>`;
    return `<li><a href="${f.replace('.md','.html')}">${name}</a></li>`;
  }).join('\n');
}

files.forEach(f => {
  const mdContent = fs.readFileSync(path.join(baseDir, f), 'utf-8');
  const htmlContent = marked(mdContent);
  const nav = genNav(f);
  
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fileNames[f]} - 马来今通项目知识库</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; min-height: 100vh; background: #f5f7fa; }
.sidebar { width: 260px; background: #1a202c; color: white; padding: 20px 0; position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto; }
.sidebar h2 { padding: 0 20px 20px; font-size: 16px; border-bottom: 1px solid #2d3748; margin-bottom: 10px; }
.sidebar ul { list-style: none; }
.sidebar li { padding: 0; }
.sidebar li a { display: block; padding: 10px 20px; color: #cbd5e0; text-decoration: none; font-size: 14px; transition: 0.2s; }
.sidebar li a:hover { background: #2d3748; color: white; }
.sidebar li.active a { background: #3182ce; color: white; font-weight: 600; }
.content { margin-left: 260px; padding: 40px; max-width: 900px; width: 100%; }
.content h1 { font-size: 28px; margin-bottom: 20px; color: #1a202c; }
.content h2 { font-size: 22px; margin: 30px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; color: #2d3748; }
.content h3 { font-size: 18px; margin: 25px 0 10px; color: #2d3748; }
.content p { line-height: 1.8; margin-bottom: 15px; color: #4a5568; font-size: 15px; }
.content table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
.content th { background: #edf2f7; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #e2e8f0; }
.content td { padding: 10px 12px; border: 1px solid #e2e8f0; }
.content tr:nth-child(even) { background: #f7fafc; }
.content ul, .content ol { margin: 10px 0 15px 20px; line-height: 1.8; }
.content li { margin-bottom: 5px; color: #4a5568; }
.content code { background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.content pre { background: #1a202c; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 15px 0; }
.content pre code { background: transparent; color: inherit; padding: 0; }
.content blockquote { border-left: 4px solid #3182ce; padding: 10px 20px; margin: 15px 0; background: #ebf8ff; border-radius: 0 8px 8px 0; }
.content blockquote p { margin: 0; color: #2b6cb0; }
.content hr { border: none; border-top: 1px solid #e2e8f0; margin: 30px 0; }
.content strong { color: #2d3748; }
.content a { color: #3182ce; text-decoration: none; }
.content a:hover { text-decoration: underline; }
@media (max-width: 768px) { .sidebar { width: 100%; height: auto; position: relative; } .content { margin-left: 0; padding: 20px; } }
</style>
</head>
<body>
<div class="sidebar">
  <h2>📂 马来今通知识库</h2>
  <ul>${nav}</ul>
</div>
<div class="content">
${htmlContent}
<hr>
<p style="text-align:center;color:#a0aec0;font-size:13px;margin-top:40px;">
  马来西亚今通国际（今日天下通）B2B平台海外拓展项目知识库 · 最后更新：2026年5月
</p>
</div>
</body>
</html>`;
  
  const outFile = f.replace('.md', '.html');
  fs.writeFileSync(path.join(baseDir, outFile), fullHtml);
  console.log(`✅ 已生成: ${outFile}`);
});

console.log('\n🎉 全部HTML生成完成！');
