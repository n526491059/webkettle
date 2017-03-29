
//给新创建的任务/转换分配任务组
function assignedTaskGroupByCreate(taskName,type,secondGuidePanel){
	Ext.Ajax.request({
		url:"/task/getJobOrTransByName.do",
		success:function(response,config){
			var result=Ext.decode(response.responseText);
			var grid="";
			if(type=="job"){
				var jobId=result.jobId;
				var jobName=taskName;
				var jobPath=result.directoryName;
				grid=generateAllTaskGroupPanel(jobId,jobPath,jobName,"create");
			}else{
				var transId=result.transformationId;
				var transName=result.name;
				var transPath=result.directoryName;
				grid=AllTaskGroupPanel(transId,transPath,transName,"create");
			}
			var assignedWindowByCreate=new Ext.Window({
				id:"assignedWindowByCreate",
				title:"任务组分配",
				bodyStyle:"background-color:white",
				width:455,
				height:570,
				listeners:{
					"close":function(){
						if(type=="trans"){
							Ext.getCmp("bodyPanelForTrans").enable();
							Ext.getCmp("westTreePanelForTrans").enable();
						}else{
							Ext.getCmp("jobBodyPanel").enable();
							Ext.getCmp("jobWestTreePanel").enable();
						}
					}
				},
				items:[
					grid
				]
			});
			assignedWindowByCreate.show(secondGuidePanel);
		},
		params:{taskName:taskName,type:type}
	})
}

function repositryOpenJob(secondGuidePanel,path,text){
	try {
		Ext.getBody().mask('正在加载，请稍后...', 'x-mask-loading');
		Ext.Ajax.request({
			url: GetUrl('repository/open.do'),
			timeout: 120000,
			params: {path: path, type: 'job'},
			method: 'POST',
			success: function(response, opts) {
				try {
					var jobComponentTree = new Ext.tree.TreePanel({
						id:"jobWestTreePanel",
						region: 'west',
						split: true,
						width: 200,
						title: '核心对象',
						useArrows: true,
						root: new Ext.tree.AsyncTreeNode({text: 'root'}),
						loader: new Ext.tree.TreeLoader({
							dataUrl: GetUrl('system/jobentrys.do')
						}),
						enableDD:true,
						ddGroup:'TreePanelDDGroup',
						autoScroll: true,
						animate: false,
						rootVisible: false
					});
					var graphPanel = Ext.create({repositoryId: path, region: 'center',id:'jobBodyPanel'}, 'JobGraph');
					secondGuidePanel.add({
						layout: 'border',
						items: [jobComponentTree, graphPanel]
					});
					secondGuidePanel.doLayout();
					activeGraph = graphPanel;
					var xmlDocument = mxUtils.parseXml(decodeURIComponent(response.responseText));
					var decoder = new mxCodec(xmlDocument);
					var node = xmlDocument.documentElement;
					var graph = graphPanel.getGraph();
					decoder.decode(node, graph.getModel());
					graphPanel.fireEvent('load');
					Ext.getCmp("jobBodyPanel").disable();
					Ext.getCmp("jobWestTreePanel").disable();
				} finally {
					Ext.getBody().unmask();
					assignedTaskGroupByCreate(text,"job",secondGuidePanel);
				}
			},
			failure: failureResponse
		});

	} finally {
		Ext.getBody().unmask();
	}
}

function repositryOpenTrans(secondGuidePanel,path,text){
	try {
		Ext.getBody().mask('正在加载，请稍后...', 'x-mask-loading');
		Ext.Ajax.request({
			url: GetUrl('repository/open.do'),
			timeout: 120000,
			params: {path: path, type: 'transformation'},
			method: 'POST',
			success: function(response, opts) {
				try {
					var transComponentTree = new Ext.tree.TreePanel({
						id:"westTreePanelForTrans",
						region: 'west',
						split: true,
						width: 200,
						title: '核心对象',
						useArrows: true,
						root: new Ext.tree.AsyncTreeNode({text: 'root'}),
						loader: new Ext.tree.TreeLoader({
							dataUrl: GetUrl('system/steps.do')
						}),
						enableDD:true,
						ddGroup:'TreePanelDDGroup',
						autoScroll: true,
						animate: false,
						rootVisible: false
					});
					var graphPanel = Ext.create({repositoryId: path, region: 'center',id:'bodyPanelForTrans'}, 'TransGraph');
					secondGuidePanel.add({
						layout: 'border',
						items: [transComponentTree, graphPanel]
					});
					secondGuidePanel.doLayout();
					activeGraph = graphPanel;
					var xmlDocument = mxUtils.parseXml(decodeURIComponent(response.responseText));
					var decoder = new mxCodec(xmlDocument);
					var node = xmlDocument.documentElement;
					var graph = graphPanel.getGraph();
					decoder.decode(node, graph.getModel());
					graphPanel.fireEvent('load');
					Ext.getCmp("bodyPanelForTrans").disable();
					Ext.getCmp("westTreePanelForTrans").disable();
				} finally {
					Ext.getBody().unmask();
					assignedTaskGroupByCreate(text,"trans",secondGuidePanel);
				}
			},
			failure: failureResponse
		});
	} finally {
		Ext.getBody().unmask();
	}
}
//transGuidePanel =
//	new Ext.tree.TreePanel({
//		id:'transGuidePanel',
//		title: '核心对象',
//		useArrows: true,
//		//region: 'east',
//		//width:200,
//		enableDD:true,
//		ddGroup:'TreePanelDDGroup',
//		autoScroll: true,
//		animate: false,
//		rootVisible: false,
//		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//		loader: new Ext.tree.TreeLoader({
//			dataUrl: GetUrl('system/steps.do')
//		})
//
//	});
//
//jobGuidePanel =
//	new Ext.tree.TreePanel({
//		id:'jobGuidePanel',
//		title: '核心对象',
//		useArrows: true,
//		//region: 'east',
//		//width:200,
//		enableDD:true,
//		ddGroup:'TreePanelDDGroup',
//		autoScroll: true,
//		animate: false,
//		rootVisible: false,
//		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//		loader: new Ext.tree.TreeLoader({
//			dataUrl: GetUrl('system/jobentrys.do')
//		}),
//
//	});

GuidePanel = Ext.extend(Ext.Panel, {
	border:false,
	initComponent: function() {
		var fristGuidePanel = new Ext.tree.TreePanel({
				useArrows: true,
				region: 'west',
				width: 200,
				split: true,
				loader : new Ext.tree.TreeLoader(),
				root : new Ext.tree.AsyncTreeNode({
					id:'fristGuidePanel',
					children:[
						{
							id:'task',
							cls:'nav-node',
							icon:'ui/images/folder.svg?scale=32',
							text : "<font size = '3px'>模型</font>",
							children:[
								{id:"newTrans",text:"<font size = '2px'>新建转换</font>",cls:"nav",leaf:true},
								{id:"newJob",text:"<font size = '2px'>新建作业</font>",cls:"nav",leaf:true}
							]
						},{
							text : "<font size = '3px'>任务</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"jobMonitor",text:"<font size = '2px'>作业管理</font>",cls:"nav",leaf:true},
								{id:"transMonitor",text:"<font size = '2px'>转换管理</font>",cls:"nav",leaf:true},
								{id:"taskGroupMonitor",text:"<font size = '2px'>任务组管理</font>",cls:"nav",leaf:true},
								{id:"taskMonitoring",text:"<font size = '2px'>任务监控</font>",cls:"nav",leaf:true}
							]
						},{
							text : "<font size = '3px'>日志</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"taskLog",text:"<font size = '2px'>任务历史日志</font>",cls:"nav",leaf:true},
							]
						},{
							text : "<font size = '3px'>节点</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"slaveMonitor",text:"<font size = '2px'>节点管理</font>",cls:"nav",leaf:true},
								{id:"slaveMonitoring",text:"<font size = '2px'>节点监控</font>",cls:"nav",leaf:true},
							]
						},{
							text : "<font size = '3px'>调度</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"schedulerMonitor",text:"<font size = '2px'>调度管理</font>",cls:"nav",leaf:true},
							]
						},{
							text : "<font size = '3px'>用户</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"userMonitor",text:"<font size = '2px'>用户管理</font>",cls:"nav",leaf:true},
								{id:"userGroupMonitor",text:"<font size = '2px'>用户组管理</font>",cls:"nav",leaf:true},
							]
						}
					]
				}),

				enableDD:true,
				ddGroup:'TreePanelDDGroup',
				autoScroll: true,
				animate: false,
				rootVisible: false
			});

		var secondGuidePanel = new Ext.Panel({
			region:'center',
			layout:'fit',
			id: 'secondGuidePanel'
			// border: false,
			// bodyStyle : 'background:#CCC'
		});

		fristGuidePanel.on('click', function(node, e) {

			if(node.text == "<font size = '2px'>新建转换</font>")
			{
				secondGuidePanel.removeAll(true);
				Ext.Msg.prompt('系统提示', '请输入转换名称:', function(btn, text){
				    if (btn == 'ok' && text != '') {
				    	Ext.getBody().mask('正在创建转换，请稍后...');
				    	Ext.Ajax.request({
							url: GetUrl('repository/createTrans.do'),
							method: 'POST',
							params: {dir: '/', transName: text},
							success: function(response) {
								var path = Ext.decode(response.responseText).message;
								repositryOpenTrans(secondGuidePanel,path,text)
							},
							failure: failureResponse
					   });
				    }
				});
			}
			else if(node.text == "<font size = '2px'>新建作业</font>")
			{
				secondGuidePanel.removeAll(true);
				Ext.Msg.prompt('系统提示', '请输入作业名称:', function(btn, text){
				    if (btn == 'ok' && text != '') {
				    	Ext.getBody().mask('正在创建作业，请稍后...');
				    	Ext.Ajax.request({
							url: GetUrl('repository/createJob.do'),
							method: 'POST',
							params: {dir: '/', jobName: text},
							success: function(response) {
								var path = Ext.decode(response.responseText).message;
								repositryOpenJob(secondGuidePanel,path,text);
							},
							failure: failureResponse
					   });
				    	
				    }
				});
				
			} else if(node.text == "<font size = '2px'>作业管理</font>")
			{
				secondGuidePanel.removeAll(true);
				secondGuidePanel.add(generateJobPanel("","",undefined));
				secondGuidePanel.doLayout();
			}else if(node.text == "<font size = '2px'>转换管理</font>") {
				secondGuidePanel.removeAll(true);
				secondGuidePanel.add(generateTrans("","",undefined));
				secondGuidePanel.doLayout();
			}else if(node.text == "<font size = '2px'>调度管理</font>") {
				secondGuidePanel.removeAll(true);
				secondGuidePanel.add(generateSchedulerMonitorPanel("","",""));
				secondGuidePanel.doLayout();
			}else if(node.text=="<font size = '2px'>任务监控</font>"){
				secondGuidePanel.removeAll(true);
				secondGuidePanel.add(showTaskControlPanel());
				secondGuidePanel.doLayout();
			}else if(node.text=="<font size = '2px'>节点管理</font>"){
				secondGuidePanel.removeAll(true);
				secondGuidePanel.add(slaveManager());
				secondGuidePanel.doLayout();
			}else if(node.text=="<font size = '2px'>节点监控</font>"){
				secondGuidePanel.removeAll(true);
				showSlaveMonitorPanel(secondGuidePanel);
			}else if(node.text=="<font size = '2px'>任务组管理</font>"){
				secondGuidePanel.removeAll(true);
				showTaskGroupPanel(secondGuidePanel);
			}else if(node.text=="<font size = '2px'>用户管理</font>"){
				showUserPanel(secondGuidePanel);
			}
		});
		
		this.items = [fristGuidePanel, secondGuidePanel];
		GuidePanel.superclass.initComponent.call(this);
	}
});

//  TransGuide = Ext.extend(Ext.Panel, {
// //     activeTab: 0,
// //     plain: true,
// 	 layout: 'border',
//
//      initComponent: function() {
//
//      	var transComponentTree = new Ext.tree.TreePanel({
//      		region: 'west',
//      		split: true,
//      		width: 200,
//
//      		title: '核心对象',
//      		useArrows: true,
//      		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
//      		loader: new Ext.tree.TreeLoader({
//      			dataUrl: GetUrl('system/steps.do')
//      		}),
//      		enableDD:true,
//      		ddGroup:'TreePanelDDGroup',
//      		autoScroll: true,
//      		animate: false,
//      		rootVisible: false
//      	});
//
// //     	var jobComponentTree = new Ext.tree.TreePanel({
// //     		title: '核心对象',
// //     		useArrows: true,
// //     		root: new Ext.tree.AsyncTreeNode({text: 'root'}),
// //     		loader: new Ext.tree.TreeLoader({
// //     			dataUrl: GetUrl('system/jobentrys.do')
// //     		}),
// //     		enableDD:true,
// //     		ddGroup:'TreePanelDDGroup',
// //     		autoScroll: true,
// //     		animate: false,
// //     		rootVisible: false
// //     	});
// //     	this.activeCom = function(item) {
// //     		this.remove(transComponentTree, false);
// //     		this.remove(jobComponentTree, false);
// //     		jobComponentTree.hide();
// //     		transComponentTree.hide();
// //
// //     		if(item && item.getXType() == 'JobGraph') {
// //     			jobComponentTree.show();
// //     			this.add(jobComponentTree);
// //     			this.setActiveTab(jobComponentTree.getId());
// //     		} else if(item && item.getXType() == 'TransGraph') {
// //     			transComponentTree.show();
// //     			this.add(transComponentTree);
// //     			this.setActiveTab(transComponentTree.getId());
// //     		}
// //     	};
//
// //         jobComponentTree.on("nodedragover", function(e){
// //         	return false;
// //         });
//
// //         transComponentTree.on("nodedragover", function(e){
// //         	return false;
// //         });
//
// //         var repositoryTree = new RepositoryManageTree({title: '资源库'});
//
//          this.items = [transComponentTree, {
//
//          }];
//
//          TransGuide.superclass.initComponent.call(this);
//
//      }
//  });
