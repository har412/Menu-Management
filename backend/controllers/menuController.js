const Menu = require('../modals/Menu')


exports.createMenu = (req, res) => {
    const { name, parent_id } = req.body;
    console.log(name, parent_id)
    var menuData = [];
    // Creates a new object 
    new Menu({
        "name": name,
        "parent_id": parent_id,
        "child": []
    }).save().then(data => {
        // console.log(data)
        menuData=data
        // res.send(data)
        // Now get id of new object created and store it in parent.
        // to find parent use parent_id 
        if(parent_id==='0'){
            res.json({"message":"New parent created as parent id is null","data":data})
        } else {
            Menu.find({ "_id": parent_id }).then(foundData => {
                let child_data = foundData[0].child;
                // 
                child_data.push(menuData)
                const final = {
                    "name": foundData[0].name,
                    "child": child_data,
                    "parent_id":foundData[0].parent_id
                }
                Menu.findByIdAndUpdate(parent_id, final).then(response => {
                    res.send(response)
                }).catch(err => {
                    res.send(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        }       
    }).catch(err => {
        console.log(err)
    });
}


exports.getParentIsNull = (req, res) => {
    
    Menu.find({ "parent_id": "0" })
        .populate(
            {
                path:"child"
            }
        )
        .then(data => {
            res.json({"data":data})
        }).catch(err => {
            res.send(err)
        })

}

exports.getCreateMenuPage = (req, res) => {
    res.render('createMenu')
}

exports.deleteMenu = (req, res) => {
    Menu.updateMany({ child: req.params.id }, { $pull: { child: req.params.id } })
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })

    Menu.deleteOne({"_id":req.params.id})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })

}


exports.updateMenu = (req, res) => {
    var { id, name } = req.body;
    console.log(name);
if(name!=null){
    Menu.findById(id)
    .then(data => {
        data.name = name;
        data.save()
            .then(response => {
                console.log(response, "res");
                res.send(response);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .catch(err => {
        res.send(err);
    });
}
   
};

exports.getAllMenu = (req,res)=>{
    Menu.find({}).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })
}


exports.getMenuDisplay = (req, res) => {
 
    


      Menu.find({ "parent_id": "0" })
      .then(menuItems => {
     res.send(menuItems)
      }).catch(err => {
          res.send(err)
      })

      
    
}   