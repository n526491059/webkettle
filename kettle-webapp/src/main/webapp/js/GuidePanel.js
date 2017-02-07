GuidePanel = Ext.extend(Ext.TabPanel, {
	activeTab: 0,
	plain: true,
	
	initComponent: function() {
		var transComponentTree = new Ext.tree.TreePanel({
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
		
		var jobComponentTree = new Ext.tree.TreePanel({
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
		var jobTree = new Ext.tree.TreePanel({
			title: '作业管理',
			useArrows: true,
			root: new Ext.tree.AsyncTreeNode({text: 'root'}),
			loader: new Ext.tree.TreeLoader({
				dataUrl: GetUrl('task/getJobs.do')
			}),
			enableDD:true,
			ddGroup:'TreePanelDDGroup',
			autoScroll: true,
			animate: false,
			rootVisible: false
		});
		var transTree = new Ext.tree.TreePanel({
			title: '转换管理',
			useArrows: true,
			root: new Ext.tree.AsyncTreeNode({text: 'root'}),
			loader: new Ext.tree.TreeLoader({
				dataUrl: GetUrl('task/getTrans.do')
			}),
			enableDD:true,
			ddGroup:'TreePanelDDGroup',
			autoScroll: true,
			animate: false,
			rootVisible: false
		});
		this.activeCom = function(item) {
			this.remove(transComponentTree, false);
			this.remove(jobComponentTree, false);
			jobComponentTree.hide();
			transComponentTree.hide();
			
			if(item && item.getXType() == 'JobGraph') {
				jobComponentTree.show();
				this.add(jobComponentTree);
				this.setActiveTab(jobComponentTree.getId());
			} else if(item && item.getXType() == 'TransGraph') {
				transComponentTree.show();
				this.add(transComponentTree);
				this.setActiveTab(transComponentTree.getId());
			}
		};
		
	    jobComponentTree.on("nodedragover", function(e){
	    	return false;
	    }); 
	    
	    transComponentTree.on("nodedragover", function(e){
	    	return false;
	    });

	    var repositoryTree = new RepositoryManageTree({title: '资源库'});

	    this.items = [repositoryTree,jobTree,transTree];
		
	    GuidePanel.superclass.initComponent.call(this);

	}
});