var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/call', function (req, res, next) {

    const fs = require('fs');

    

    fs.readFile('./public/saved/'+req.query.fileName, (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        res.json(student);
    });    
    //res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/load', function (req, res, next) {
    const fs = require('fs');

    forms = [];

    fs.readdirSync('./public/saved', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => {
        forms.push(item.name)
    })

    res.json(forms);
    //res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/CTF', function (req, res, next) {
    res.render('menu', { title: 'Express' });
});

router.post('/save', function (req, res, next) {
    //res.render('CTF', { title: 'Express' });

    console.log('Save : '+req.body.save);

    // file system module to perform file operations
    const fs = require('fs');

    fs.writeFile("public/saved/"+req.body.name+"-"+req.body.regno+".json", req.body.save, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        res.send("JSON file has been saved.");
    });
});


/* GET home page. */
router.get('/courses', function (req, res, next) {
    //ures.render('CTF', { title: 'Express' });
    const courses = require('../public/CTF.json')
    console.log('term : '+req.query['term'].toLowerCase());
    var sel = []
    
    courses.forEach(function (course, i) {
        if (course.course.toLowerCase().includes(req.query["term"].toLowerCase()) || 
            course.code.toLowerCase().includes(req.query["term"].toLowerCase())) {
            course["id"] = i,
                course["value"] = course.code+" " +course.course+"  ("+course.theory+", "+course.lab+")"
            sel.push(course);
        }
    });

    res.json(sel);
    //console.log(data);
});

module.exports = router;
