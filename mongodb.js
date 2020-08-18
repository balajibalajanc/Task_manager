const {MongoClient,ObjectID}=require('mongodb');
//Need a client to access the database
// const MongoClient= mongodb.MongoClient;

//provide  the connection URl in a variable
const ConnectionUrl='mongodb://127.0.0.1:27017'

//Create a database name
const databaseName='task-manager'

//conncetion object and url parser and call back function(Asynchronous operation)
MongoClient.connect(ConnectionUrl,{useUnifiedTopology: true},(error,client)=>
    {
        if(error)
        {
             return console.log("Unable to connect to the database");
        }

        console.log("Connected to the database successfully");

        const db=client.db(databaseName);

        //Delete Operation
        // db.collection('task').deleteOne({
        //     Task:"Updating"
        // }).then((result)=>{}).catch((reject)=>{})

        //Update Operation
        //    db.collection('task').updateMany({_id:new ObjectID("5f38e2141c04325194a17b1a")},{
        //     $set:{
        //         completed_status: "Done"
        //     }
        // }).then((result)=>{console.log(result);}).catch((reject)=>{
        //     console.log(reject);
        // })

        //Read Operation

        // db.collection('task').findOne({ _id : new ObjectID("5f38e2141c04325194a17b19")},(error,result)=>{
        //     if(error)
        //       {
        //          return console.log("Something wrong happened while findind the document");
        //      }

        //      console.log(result);
            
        // })
        // db.collection('task').find({ completed_status:'True'}).toArray((error,result)=>{
        //     if(error)
        //     {
        //        return console.log("Something wrong happened while findind the document");
        //    }

        //    console.log(result);
       // })

        //Create Operation
        // db.collection('users').insertOne({
        //     _id:id,
        //     name:'Surya',
        //     numner:'9943443435'
        // },(error,result)=>
        // {
        //      if(error)
        //      {
        //         return console.log("Something wrong happened while inserting the document");
        //      }
        //      console.log(result.insertedCount);
        // })
        // db.collection('task').insertMany(
        //     [
        //         {
        //             Task:'Reading',
        //             completed_status:'True'
        //         },{
        //             Task:'Writing',
        //             completed_status:'True'
        //         },{
        //             Task:'Updating',
        //             completed_status:'True'
        //         }
        //     ],(error,result)=>{

        //         if(error)
        //         {
        //             return console.log('Something wrong happened while inserting the document');
        //         }

        //         console.log(result.ops);
        //         console.log(result.insertedCount);
        //     }
        // )
    })