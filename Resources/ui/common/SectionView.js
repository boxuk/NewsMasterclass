/**
 * The SectionView module lists news items within a given section
 */
function SectionView(client) {
	var self = Ti.UI.createView();
	
	var table = Ti.UI.createTableView();
	self.add(table);
	
	var success = function (data) {
		if (data.response.results.length == 0) {
			return;
		}
		
		var i = 0, tableData = [];
		while(i < data.response.results.length) {
			var item = data.response.results[i];
			tableData.push({
				title: item.webTitle,
				item: item
			});
			i++;
		}
		table.setData(tableData);
	};
	
	var failure = function (data) {
		alert(data);
	}
	
	self.addEventListener('sectionSelected', function(event) {
	    table.setData([]);
	    client.getItemsInSection(event.sectionId, success, failure, this);
	});
	
	return self;
};

module.exports = SectionView;
