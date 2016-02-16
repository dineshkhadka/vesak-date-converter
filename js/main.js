jQuery(function($) {
    var englishMonth = ['January','February','March','April','May','June','July','August','september','October','November','December'];
    var nepaliMonth = ['Baisakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    var App = {

        init: function() {
            const $englishButton = $('#english-convert-button');
            
            
            $englishButton.on('click',
                function() {
                    var fromDate = getEnglishDate()
                    var crunch = engtonep.DateConversion(fromDate.eDay, fromDate.eMonth, fromDate.eYear);
                    //console.log(fromDate.eYear)
                    //crunch.getYear() + ", " + nepaliMonth[parseInt(crunch.getMonth())] + ", " + crunch.getDay()
                    $('#converted-date')
                        .empty()
                        .append('Your converted date is: ')
                        .append(
                                crunch.getYear() +', '+ addSuffix(crunch.getDate())+' of '+ nepaliMonth[parseInt(crunch.getMonth())]
                            );
                    //console.log(crunch.getYear())
                });




        }
    }

    var addSuffix = function (theDate){
        var stamp;
        if ((theDate >= 11) && (theDate <= 13)) {
            stamp = 'th';

        } else {
            var endsWith = theDate % 10,
                stamp = ((theDate % 100 / 10) === 1) ? 'th' : (endsWith === 1) ? 'st' : (endsWith === 2) ? 'nd' : (endsWith === 3) ? 'rd' : 'th';

        }
        return theDate + stamp
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