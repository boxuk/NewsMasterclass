function ApplicationWindow() {
	//declare module dependencies
	var HomeView = require('ui/common/HomeView'),
        SectionView = require('ui/common/SectionView'),
        ItemView = require('ui/common/ItemView'),
        OpenPlatformClient = require('openplatform/Client');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title:'OpenPlatform Browser',
		exitOnClose:true,
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	
	//read parameters
    var fileName = 'parameters.json';
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
     
    if (file.exists()) {
      var parameters = JSON.parse(file.read());
    }
    
    var client = new OpenPlatformClient(parameters.apiKey);
        
	//construct UI
	var homeView = new HomeView();
	self.add(homeView);

	//launch section view when a section is selected
	homeView.addEventListener('sectionSelected', function(event) {
		//create detail view container
		var sectionView = new SectionView(client);
		var sectionContainerWindow = Ti.UI.createWindow({
			title:'Section',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		
		//launch item view when an item is selected
        sectionView.addEventListener('itemSelected', function(event) {
            var itemView = new ItemView(event.item);
            var itemContainerWindow = Ti.UI.createWindow({
                title:event.item.webTitle,
                navBarHidden:false,
                backgroundColor:'#ffffff'
            });
            itemContainerWindow.add(itemView);
            itemContainerWindow.open();
        });
		
		sectionContainerWindow.add(sectionView);
		sectionView.fireEvent('sectionSelected',event);
		sectionContainerWindow.open();
	});
	
	return self;
};

module.exports = ApplicationWindow;
