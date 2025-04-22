// Скрипт который исправляет проблему совместимости react-native-pager-view с версией react-native 0.79
// ссылка на тикет с проблемой - https://github.com/callstack/react-native-pager-view/issues/993
const fs = require('fs');
const path = require('path');

function fixPagerView() {
  // путь относительно корня проекта
  const filePath = path.join(
    __dirname,
    '.',
    'node_modules',
    'react-native-pager-view',
    'android',
    'src',
    'fabric',
    'java',
    'com',
    'reactnativepagerview',
    'PagerViewViewManager.kt',
  );

  if (!fs.existsSync(filePath)) {
    console.warn('⚠️ PagerViewViewManager.kt not found, skipping fix');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const before =
    'receiveCommand(root: NestedScrollableHost, commandId: String?';
  const after = 'receiveCommand(root: NestedScrollableHost, commandId: String';

  if (content.includes(before)) {
    content = content.replace(before, after);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed PagerViewViewManager.kt');
  } else {
    console.log('ℹ️ PagerViewViewManager.kt already patched');
  }
}

try {
  fixPagerView();
} catch (e) {
  console.error('❌ Error applying PagerView fix:', e);
  process.exit(1);
}
