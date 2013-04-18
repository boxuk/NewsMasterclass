function ApplicationWindow() {
	//declare module dependencies
	var HomeView = require('ui/common/HomeView'),
		SectionView = require('ui/common/SectionView'),
		ItemView = require('ui/common/ItemView'),
		OpenPlatformClient = require('openplatform/Client');
		
	//create object instance
	var self = Ti.UI.createWindow({
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
	var homeView = new HomeView(),
		sectionView = new SectionView(client);
		
	//create home view container
	var homeContainerWindow = Ti.UI.createWindow({
		title:'OpenPlatform Browser'
	});
	homeContainerWindow.add(homeView);
	
	//create section view container
	var sectionContainerWindow = Ti.UI.createWindow({
		title:'Section'
	});
	sectionContainerWindow.add(sectionView);
	
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:homeContainerWindow
	});
	self.add(navGroup);
	
	//launch section view when a section is selected
	homeView.addEventListener('sectionSelected', function(event) {
		sectionView.fireEvent('sectionSelected', event);
		navGroup.open(sectionContainerWindow);
	});
	
	//launch item view when an item is selected
    sectionView.addEventListener('itemSelected', function(event) {
        var itemContainerWindow = Ti.UI.createWindow({
            title:event.item.webTitle
        });
        var itemView = new ItemView(event.item);
        itemContainerWindow.add(itemView);
        navGroup.open(itemContainerWindow);
    });
	
	return self;
};

module.exports = ApplicationWindow;
