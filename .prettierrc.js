module.exports = {
  vueIndentScriptAndStyle: false, // vue文件的script标签和Style标签下的内容 缩进
  printWidth: 80, // 超过最大值换行
  preserve: 'never',
  proseWrap: 'never',
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  tabWidth: 2, // 缩进字节数
  semi: false, // 语句末尾不使用分号
  singleQuote: true, // 强制使用单引号
  trailingComma: 'none', // 数组、对象最后一个元素是否有尾逗号
  endOfLine: 'auto', // 忽略换行符
  arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号。avoid【不带】
  useTabs: false // 缩进使用tab
}
