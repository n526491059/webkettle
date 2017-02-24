


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
							text : "<font size = '3px'>模型设计</font>",
							children:[
								{id:"newTrans",text:"<font size = '2px'>新建转换</font>",cls:"nav",leaf:true},
								{id:"newJob",text:"<font size = '2px'>新建作业</font>",cls:"nav",leaf:true}
							]
						},
						{
							text : "<font size = '3px'>任务管理</font>",icon:'ui/images/folder.svg?scale=32', cls:'nav-node',
							children:[
								{id:"jobMonitor",text:"<font size = '2px'>作业管理</font>",cls:"nav",leaf:true},
								{id:"transMonitor",text:"<font size = '2px'>转换管理</font>",cls:"nav",leaf:true}
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
								try {
									var path = Ext.decode(response.responseText).message;
									
									
									
									Ext.getBody().mask('正在加载，请稍后...', 'x-mask-loading');
									
									Ext.Ajax.request({
										url: GetUrl('repository/open.do'),
										timeout: 120000,
										params: {path: path, type: 'trans'},
										method: 'POST',
										success: function(response, opts) {
											try {
												var transComponentTree = new Ext.tree.TreePanel({
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
												
												var graphPanel = Ext.create({repositoryId: path, region: 'center'}, 'TransGraph');
												
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
											} finally {
												Ext.getBody().unmask();
											}
										},
										failure: failureResponse
									});
									
								} finally {
									Ext.getBody().unmask();
								}
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
								try {
									var path = Ext.decode(response.responseText).message;



									Ext.getBody().mask('正在加载，请稍后...', 'x-mask-loading');

									Ext.Ajax.request({
										url: GetUrl('repository/open.do'),
										timeout: 120000,
										params: {path: path, type: 'job'},
										method: 'POST',
										success: function(response, opts) {
											try {
												
												var transComponentTree = new Ext.tree.TreePanel({
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
												
												var graphPanel = Ext.create({repositoryId: path, region: 'center'}, 'JobGraph');
												
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
											} finally {
												Ext.getBody().unmask();
											}
										},
										failure: failureResponse
									});
									
								} finally {
									Ext.getBody().unmask();
								}
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
