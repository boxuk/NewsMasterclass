/**
 * The HomeView module creates the root view of the application in which 
 * sections of news are listed. 
 */
function HomeView() {
	// Create view
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	// Add sections as rows in the table
	var tableData = [
		{id: "news", title:'News', hasChild:true, color: '#000'},
		{id: "sport", title:'Sport', hasChild:true, color: '#000'},
		{id: "music", title:'Music', hasChild:true, color: '#000'},
		{id: "film", title:'Film', hasChild:true, color: '#000'},
		{id: "politics", title:'Politics', hasChild:true, color: '#000'}
	];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	// When a row is tapped, fire an event containing details of the section that was selected 
	table.addEventListener('click', function(event) {
		self.fireEvent('sectionSelected', {
			sectionId: event.rowData.id,
			name: event.rowData.title
		});
	});
	
	return self;
};

module.exports = HomeView;