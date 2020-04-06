$(function(){

    chrome.storage.sync.get(['total', 'username'],function(cost_obj){
        $('#total').text(cost_obj.total);
		$('#username').text(cost_obj.username);
    });

    $('#saveData').click(function(){
        chrome.storage.sync.get(['total', 'username'],function(cost_obj){
            var newTotal = 0;
			var newUser = '';
            if (cost_obj.total){
                newTotal += parseInt(cost_obj.total);
            }
			if (cost_obj.username){
				newUser = cost_obj.username;
			}
			
			var username = $('#username').val();
			var billname = $('#billName').val();
			var billAmount = $('#billAmount').val();
			if (billAmount) {
				newTotal += parseInt(billAmount);
			}
			var date = $('#date').val();
			var description = $('#description').val();
			var category = $('#category').val();
		

            chrome.storage.sync.set({'total': newTotal, 'username': username});
            $('#total').text(newTotal);
			$('#username').text(username);
			$('#billName').val('');
            $('#billAmount').val('');
			$('#date').val('');
			$('#description').val('');
			$('#category').val('');  
        });
	});
	
	$('#snipBill').click(function(){
		
	});
		
});