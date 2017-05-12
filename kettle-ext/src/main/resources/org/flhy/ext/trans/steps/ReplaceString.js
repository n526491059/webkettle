ReplaceStringDialog = Ext.extend(KettleDialog, {
title: '字符串替换',
width: 600,
height: 400,
initComponent: function() {
var me = this;

var store = new Ext.data.JsonStore({
fields: ['in_stream_name', 'out_stream_name', 'use_regex', 'replace_string','replace_by_string','set_empty_string','replace_field_by_string','whole_word','case_sensitive']
});

this.initData = function() {
var cell = this.getInitData();
ReplaceStringDialog.superclass.initData.apply(this, [cell]);
store.loadData(Ext.decode(cell.getAttribute('fields')));
};

this.saveData = function(){
var data = {};
data.fields = Ext.encode(store.toJson());

return data;
};

this.fitItems = new KettleEditorGrid({
title: '要剪切的字段',
xtype: 'KettleEditorGrid',
menuAdd: function(menu) {
menu.insert(0, {
text: '获取字段', scope: this, handler: function() {
me.onSure(false);
getActiveGraph().inputOutputFields(cell.getAttribute('label'), true, function(s) {
store.merge(s, [{name:'in_stream_name', field: 'name'}]);
});
}
});
menu.insert(1, '-');
},
columns: [new Ext.grid.RowNumberer(), {
header: '输入流字段', dataIndex: 'in_stream_name', width: 120, editor: new Ext.form.ComboBox({
displayField: 'name',
valueField: 'name',
typeAhead: true,
forceSelection: true,
triggerAction: 'all',
selectOnFocus:true,
store: getActiveGraph().inputFields(cell.getAttribute('label'))
})
},{
header: '输出流字段', dataIndex: 'out_stream_name', width: 120, editor: new Ext.form.TextField()
},{
header: '使用正则表达式', dataIndex: 'use_regex', width: 100, editor: new Ext.form.TextField()
},{
header: '搜索', dataIndex: 'replace_string', width: 100, editor: new Ext.form.TextField()
},{
    header: '使用...替换', dataIndex: 'replace_by_string', width: 120, editor: new Ext.form.TextField()
},{
    header: '设置为空串?', dataIndex: 'set_empty_string', width: 100, editor: new Ext.form.TextField()
},{
    header: '使用字符值替换', dataIndex: 'replace_field_by_string', width: 100, editor: new Ext.form.TextField()
},{
    header: '整个单词匹配', dataIndex: 'whole_word', width: 100, editor: new Ext.form.TextField()
},{
    header: '大小写敏感', dataIndex: 'case_sensitive', width: 100, editor: new Ext.form.TextField()
}],
store: store
});

ReplaceStringDialog.superclass.initComponent.call(this);
}
});

Ext.reg('ReplaceString', ReplaceStringDialog);