

module.exports = class CompatabilityCalculator{



    constructor(firstName,secondName)
    {
        this.firstName  =   firstName;
        this.secondName =   secondName;
    }

    calculateCompatability()
    {
        // Calculate the result of each love calculator and send it to the aggregator
        var classicCompResultNorm = this.calculator1()/100;
        var oceanCompResultNorm   = this.calculator2()/200;
        var dimorphicResultNorm   = this.calculator3()/6;

        // This line should be used if calculator 2 and 3 have been implemented
        // var result             = this.aggregator(classicCompResultNorm,oceanCompResultNorm,dimorphicResultNorm)

        // While calulator 1 is the only implemented calculator, we will use the line below in the mean time
        var result                = this.aggregator(classicCompResultNorm)
        
   
        // Return the aggregated result
        return result
    }

    calculator1()
    {
        // This calculator calculates the compatability using the traditional love compatability algorithm
        try
        {
            var score           = 0

            var stringToProcess = this.firstName + "loves" + this.secondName
            var charArray       = Array.from(stringToProcess)

        
            var tempCountArray  = []

            while(charArray.length != 0)
            {
                tempCountArray.push(this.charOccuranceFrequency(charArray[0],charArray))
                // Remove the char from the string
                charArray = this.removeCharFromString(charArray[0],charArray)
            }
         

            // Process the temp array countaining the char freq
            while(tempCountArray.length > 2)
            {
                var tempArray = []

                for(var y = 0; y < tempCountArray.length; y++)
                {
                    var z = tempCountArray.length-1-y

                    if(y != z && y < z)
                    {
                        tempArray.push(tempCountArray[y] + tempCountArray[z])
                    }
                    else if( y == z)
                    {
                        tempArray.push(tempCountArray[y])
                    }
                }

                tempCountArray  =   tempArray

            }
      
            if(tempCountArray.length > 1)
            {
                score =  parseInt(tempCountArray[0].toString() + tempCountArray[1].toString())
            }
            else
            {
                score = tempCountArray[0]
            }
            

            if(score > 100)
            {
                score = 100
            }

            // Return the score
            return score

        }
        catch(error)
        {
            console.log("Error during classicLoveCalculator: ", error)
        }
    }

    removeCharFromString(charToRemove,arrayToRemoveFrom)
    {
        const searchExp         = new RegExp(charToRemove, 'g'); // Throws SyntaxError

        var stringToRemoveFrom = arrayToRemoveFrom.join("")       

        return Array.from(stringToRemoveFrom.replace(searchExp,''))
    }


    charOccuranceFrequency(charToCheck,arrayToCheck)
    {
        // Convert the string input to a char array
        var freq      = 0

        for(var y = 0; y < arrayToCheck.length; y++)
        {
            if(arrayToCheck[y] == charToCheck)
            {
                freq += 1
            }
        }   

        return freq
    }



    calculator2()
    {
        // This calculator calculates the compatability using the OCEAN personality compatability algorithm

        // Unimplemented
        return 0
    }
    
    calculator3()
    {
        // This calculator calculates the compatability using the dimpr personality compatability algorithm

        // Unimplemented
        return 0
    }

    aggregator(cal1Norm,cal2Norm,cal3Norm)
    {
        var result

        if(arguments.length > 1)
        {
            const classicLoveCompWeight   =   0.2
            const oceanPersonalityWeight  =   0.5
            const dimorphicDiffWeight     =   0.3
    
            result = (cal1Norm*classicLoveCompWeight) + (cal2Norm*oceanPersonalityWeight) + (cal3Norm*dimorphicDiffWeight)     
    
        }
        else
        {
            result = cal1Norm*1
        }
       
        return(result)
    }
}