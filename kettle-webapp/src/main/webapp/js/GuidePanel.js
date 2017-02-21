
fristGuidePanel =
	new Ext.tree.TreePanel({

		useArrows: true,
		region: 'center',
		loader : new Ext.tree.TreeLoader(),
		root : new Ext.tree.AsyncTreeNode({
			id:'fristGuidePanel',
			children:[
				{
					id:'task',
					cls:'nav-node',
					icon:'ui/images/folder.svg?scale=32',
					text : "<font size = '3px'>模型设计</font>",
					children:[
						{id:"newTrans",text:"<font size = '2px'>新建转换</font>",cls:"nav",leaf:true},
						{id:"newJob",text:"<font size = '2px'>新建作业</font>",cls:"nav",leaf:true}
					]
				},
				{
					text : "<font size = '3px'>任务管理</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
					children:[
						{id:"newTrans",text:"<font size = '2px'>作业管理</font>",cls:"nav",leaf:true},
						{id:"newJob",text:"<font size = '2px'>转换管理</font>",cls:"nav",leaf:true}
					]
				}
			]
		}),

		enableDD:true,
		ddGroup:'TreePanelDDGroup',
		autoScroll: true,
		animate: false,
		rootVisible: false,
	});

transGuidePanel =
	new Ext.tree.TreePanel({
		id:'transGuidePanel',
		title: '核心对象',
		useArrows: true,
		//region: 'east',
		//width:200,
		enableDD:true,
		ddGroup:'TreePanelDDGroup',
		autoScroll: true,
		animate: false,
		rootVisible: false,
		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
		loader: new Ext.tree.TreeLoader({
			dataUrl: GetUrl('system/steps.do')
		}),

	});

jobGuidePanel =
	new Ext.tree.TreePanel({
		id:'jobGuidePanel',
		title: '核心对象',
		useArrows: true,
		//region: 'east',
		//width:200,
		enableDD:true,
		ddGroup:'TreePanelDDGroup',
		autoScroll: true,
		animate: false,
		rootVisible: false,
		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
		loader: new Ext.tree.TreeLoader({
			dataUrl: GetUrl('system/jobentrys.do')
		}),

	});
secondGuidePanel =  new Ext.Panel({
	region:'east',
	layout:'fit',
	id: 'secondGuidePanel',
	width: 200,
	bodyStyle : 'background:#CCC'

})

GuidePanel = Ext.extend(Ext.Panel, {

	initComponent: function() {
		GuidePanel.superclass.initComponent.call(this);
	}
});

// GuidePanel = Ext.extend(Ext.TabPanel, {
//     activeTab: 0,
//     plain: true,
//
//     initComponent: function() {
//
//     	var transComponentTree = new Ext.tree.TreePanel({
//     		title: '核心对象',
//     		useArrows: true,
//     		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//     		loader: new Ext.tree.TreeLoader({
//     			dataUrl: GetUrl('system/steps.do')
//     		}),
//     		enableDD:true,
//     		ddGroup:'TreePanelDDGroup',
//     		autoScroll: true,
//     		animate: false,
//     		rootVisible: false
//     	});
//
//     	var jobComponentTree = new Ext.tree.TreePanel({
//     		title: '核心对象',
//     		useArrows: true,
//     		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//     		loader: new Ext.tree.TreeLoader({
//     			dataUrl: GetUrl('system/jobentrys.do')
//     		}),
//     		enableDD:true,
//     		ddGroup:'TreePanelDDGroup',
//     		autoScroll: true,
//     		animate: false,
//     		rootVisible: false
//     	});
//     	var jobTree = new Ext.tree.TreePanel({
//     		title: '作业管理',
//     		useArrows: true,
//     		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//     		loader: new Ext.tree.TreeLoader({
//     			dataUrl: GetUrl('task/getJobs.do')
//     		}),
//     		enableDD:true,
//     		ddGroup:'TreePanelDDGroup',
//     		autoScroll: true,
//     		animate: false,
//     		rootVisible: false
//     	});
//     	var transTree = new Ext.tree.TreePanel({
//     		title: '转换管理',
//     		useArrows: true,
//     		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//     		loader: new Ext.tree.TreeLoader({
//     			dataUrl: GetUrl('task/getTrans.do')
//     		}),
//     		enableDD:true,
//     		ddGroup:'TreePanelDDGroup',
//     		autoScroll: true,
//     		animate: false,
//     		rootVisible: false
//     	});
//     	this.activeCom = function(item) {
//     		this.remove(transComponentTree, false);
//     		this.remove(jobComponentTree, false);
//     		jobComponentTree.hide();
//     		transComponentTree.hide();
//
//     		if(item && item.getXType() == 'JobGraph') {
//     			jobComponentTree.show();
//     			this.add(jobComponentTree);
//     			this.setActiveTab(jobComponentTree.getId());
//     		} else if(item && item.getXType() == 'TransGraph') {
//     			transComponentTree.show();
//     			this.add(transComponentTree);
//     			this.setActiveTab(transComponentTree.getId());
//     		}
//     	};
//
//         jobComponentTree.on("nodedragover", function(e){
//         	return false;
//         });
//
//         transComponentTree.on("nodedragover", function(e){
//         	return false;
//         });
//
//         var repositoryTree = new RepositoryManageTree({title: '资源库'});
//
//         this.items = [repositoryTree,jobTree,transTree];
//
//         GuidePanel.superclass.initComponent.call(this);
//
//     }
// });