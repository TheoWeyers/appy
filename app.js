const express                   = require("express")

const CompatabilityCalculator   = require("./CompatabilityCalculator")

const app                       = express()


// Start the webserver on port 80
const webserverPort = 80
app.listen(webserverPort,() =>{console.log("Starting websever on port ", webserverPort)})


app.get('/v1/calculateCompatibility', (req,res) =>
{
    var returnVariable  =   {
                                    status: 400,
                                    output: {}
                            }

    try{

        // Input data validation
        var firstName       =   req.query.firstName
        var secondName      =   req.query.secondName

        if(typeof firstName === 'string' && typeof secondName === 'string')
        {
            var compatabilityCalculator  = new CompatabilityCalculator(firstName,secondName)
            var result                   = compatabilityCalculator.calculateCompatability()

            returnVariable.status        = 200
            returnVariable.output        = result
        }
        else
        {
            // Input not valid, do not proceed

        }


    }
    catch(error){

        // This simply logs the error to the console, an http code of 400 is sent to the user if the request fails
        console.log("An error occured during caluclations: ", error)
    }
    finally{

        res.sendStatus = returnVariable.status
        res.send({result:returnVariable.output})
    }
})

// Normalize the test scores before feeding into aggregator function