
jQuery(function($){

	var App = {

		init: function() {
			var $englishButton = $('#english-convert-button');
			$englishButton.on('click', 
				function(){
					var fromDate = getEnglishDate()
					var crunch = engtonep.DateConversion(fromDate.eDay, fromDate.eMonth, fromDate.eYear);
					console.log(fromDate.eYear)
					console.log(crunch.getYear())
			})
		}
	}


	var getEnglishDate = function() {

		return {
			eYear: parseInt($('#english-conversion-form > #english-date-selector option:selected').val()),
			eMonth: parseInt($('#english-conversion-form > #english-month-selector option:selected').val()),
			eDay: parseInt($('#english-conversion-form > #english-day-selector option:selected').val())

		}
	}
	App.init()

	
	//console.log(ajako.toEnglish(08, 10, 2072))
});