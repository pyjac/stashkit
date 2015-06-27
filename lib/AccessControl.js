/**
 * Created by tthlex on 26/06/15.
 */

function ACL(options){
    if(options.mongoose){
        this.mongoose = options.mongoose;
        this._model = ModelSchema(this.mongoose);
    }
    else throw new Error('You have not yet passed in MongoDB Connection');
}


function ModelSchema(mongoose){
    var Modeller = mongoose.Schema;
    var ACLSchema = new Modeller({
        objectID:String,
        create:Boolean,
        read:Boolean,
        update:Boolean,
        delete:Boolean
    });
    return mongoose.Model('ACL', ACLSchema)
}

module.exports = function(options){
    return function(req, res, next){
        return new ACL(options);
    }
}
