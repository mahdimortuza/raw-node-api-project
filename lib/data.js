const fs = require('fs')
const path = require('path')

const lib = {}

lib.basedir = path.join(__dirname, '../.data/')

//write data to file
lib.create = (dir, file, data, callback) => {

// open file for writing
fs.open(lib.basedir+dir+'/'+file+'.json',  'wx', (err, fileDescriptor) => {
    if(!err && fileDescriptor){

        // convert data to string
        const stringData = JSON.stringify(data)

        // write data to file and close
        fs.writeFile(fileDescriptor, stringData,  (err2) =>{
            if(!err2){
                 fs.close(fileDescriptor,  (err3) => {
                    if(!err3){
                        callback(false)
                    }else{
                        callback("Error closing the file. ")
                    }
                 })
            }else{
                callback("Error writing to new file.")
            }
        })

    }else{
        callback('could not create new file it may already exists.')
    }
})
}

module.exports = lib