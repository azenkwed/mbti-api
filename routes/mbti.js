/*	mbti.js
*/

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db;

// Set up the connection to the local db
var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

// Open the connection to the server
mongoclient.open(function(err, mongoclient) {
    db = mongoclient.db("mbtidb");

    db.collection('mbtis', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'mbtis' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.findAll = function(req, res) {
	console.log(req.params);
	var id = req.query['id'];
	db.collection('mbtis', function (err, collection) {
		if (id) {
			collection.find({"id": new RegExp(id, "i")}).toArray(function(err, items) {
				res.jsonp(items);
			});
		}
		else {
			collection.find().toArray(function(err, items) {
				res.jsonp(items);
			});
		}

	});
};

exports.findById = function (req, res) {
	var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('mbtis', function(err, collection) {
    	collection.findOne({'mbti.id': id}, function(err, item) {
    		console.log(item);
            res.jsonp(item);
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating mbtis database...");
    var mbtis = [
	    {
		"mbti": {
		    "id": 1,
		    "_author": "Abdelkader DJEHAF",
		    "_version": "0.0.1",
		    "_description": "MBTI FORM M 93 QUESTIONS",
		    "_personalityTypes": "E|I , S|N, T|F, J|P",
		    "_keys": "id, question, a1, a2, v1. v2",
		    "parts": [
		      {
		        "part": [
		          {
		            "id": 1
		          },
		          {
		            "title": "Which answer comes closest to describing how you usually feel or act ?"
		          },
		          {
		            "questions": [
		              {
		                "id": 1,
		                "question": "When you go somewhere for the day, would you rather",
		                "a1": "plan what you will do and when",
		                "a2": "just go",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 2,
		                "question": "Do you consider yourself to be",
		                "a1": "more of a spontaneous person",
		                "a2": "more of an organised person",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 3,
		                "question": "if you were a teacher, would you rather teach",
		                "a1": "fact courses",
		                "a2": "courses involving theory",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 4,
		                "question": "are you usually",
		                "a1": "a \"good mixer\"",
		                "a2": "rather quiet and reserved",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 5,
		                "question": "do you usually get along better with",
		                "a1": "imaginative people",
		                "a2": "realistic people",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": "6",
		                "question": "do you more often let",
		                "a1": "your heart rule your head",
		                "a2": "your head rule your heart",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 7,
		                "question": "do you prefer to do many things",
		                "a1": "one the spur of the moment",
		                "a2": "according to your plans",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 8,
		                "question": "are you",
		                "a1": "easy to get to know",
		                "a2": "hard to get to know",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 9,
		                "question": "Does following a schedule",
		                "a1": "appeal to you",
		                "a2": "cramp you",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 10,
		                "question": "when you have a special job to do, do you like to",
		                "a1": "organise it carefully before you start",
		                "a2": "find out what is necessary as you go along",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 11,
		                "question": "in most instances, do you prefer to",
		                "a1": "go with the flow",
		                "a2": "follow a schedule",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 12,
		                "question": "would most people say you are",
		                "a1": "a private person",
		                "a2": "a very open person",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 13,
		                "question": "would you rather be considered",
		                "a1": "a practical person",
		                "a2": "an ingenious person",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 14,
		                "question": "in a large group do you more often",
		                "a1": "introduce others",
		                "a2": "get introduced",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 15,
		                "question": "would you rather have as friend someone who",
		                "a1": "is always coming up with new ideas",
		                "a2": "has both feet on the ground",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 16,
		                "question": "are you inclined to",
		                "a1": "value sentiment more than logic",
		                "a2": "value logic more than sentiment",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 17,
		                "question": "do you prefet to",
		                "a1": "wait and see what happens and then make plans",
		                "a2": "plan things far in advance",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 18,
		                "question": "do you tend to spend a lot of time",
		                "a1": "by yourself",
		                "a2": "with others",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 19,
		                "question": "do you find being around a lot of people",
		                "a1": "give you more energy",
		                "a2": "is often \"draining\"",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 20,
		                "question": "do you prefer to",
		                "a1": "arrange dates, partie, etc.",
		                "a2": "be free to do whatever looks like fun when the time comes",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 21,
		                "question": "in planing a trip would you prefer to",
		                "a1": "most of the time do whatever you feel like that day",
		                "a2": "know ahead of time what you'll be doing most days",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 22,
		                "question": "at partie, do you",
		                "a1": "sometimes get bored",
		                "a2": "always have fun",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 23,
		                "question": "do you usually",
		                "a1": "mingle well with others",
		                "a2": "tend to keep more to yourself",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 24,
		                "question": "are you more attracted to",
		                "a1": "a person with a quick and brilliant mind",
		                "a2": "a practical person with a lot of common sense",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 25,
		                "question": "in you daily work, do you",
		                "a1": "rather enjoy an emergency that makes you work against time",
		                "a2": "usually plan your work so you won't need to work under pressure",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 26,
		                "question": "would you say it generally takes others",
		                "a1": "a lot of time to get to know you",
		                "a2": "a little time to get to know you",
		                "v1": "i",
		                "v2": "e"
		              }
		            ]
		          }
		        ]
		      },
		      {
		        "part": [
		          {
		            "id": 2
		          },
		          {
		            "title": "Which word in each pair appeals to you more? Think about what the words mean, not about how they look or how they sound."
		          },
		          {
		            "questions": [
		              {
		                "id": 27,
		                "question": null,
		                "a1": "private",
		                "a2": "open",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 28,
		                "question": null,
		                "a1": "schedules",
		                "a2": "unplanned",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 29,
		                "question": null,
		                "a1": "abstract",
		                "a2": "solid",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 30,
		                "question": null,
		                "a1": "gentle",
		                "a2": "firm",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 31,
		                "question": null,
		                "a1": "thinking",
		                "a2": "feeling",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 32,
		                "question": null,
		                "a1": "facts",
		                "a2": "ideas",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 33,
		                "question": null,
		                "a1": "impulsive",
		                "a2": "decision",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 34,
		                "question": null,
		                "a1": "hearty",
		                "a2": "quiet",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 35,
		                "question": null,
		                "a1": "quiet",
		                "a2": "outgoing",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 36,
		                "question": null,
		                "a1": "systematic",
		                "a2": "casual",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": "37",
		                "question": null,
		                "a1": "theory",
		                "a2": "certainty",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 38,
		                "question": null,
		                "a1": "sensitive",
		                "a2": "just",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": "39",
		                "question": null,
		                "a1": "convincing",
		                "a2": "touching",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 40,
		                "question": null,
		                "a1": "statement",
		                "a2": "concept",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": "41",
		                "question": null,
		                "a1": "unconstrained",
		                "a2": "scheduled",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 42,
		                "question": null,
		                "a1": "reserved",
		                "a2": "talkative",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": "43",
		                "question": null,
		                "a1": "orderly",
		                "a2": "easygoing",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 44,
		                "question": null,
		                "a1": "ideas",
		                "a2": "actuallity",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 45,
		                "question": null,
		                "a1": "compassion",
		                "a2": "foresight",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": "46",
		                "question": null,
		                "a1": "benefits",
		                "a2": "blessings",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 47,
		                "question": null,
		                "a1": "no-nonsense",
		                "a2": "theoritical",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 48,
		                "question": null,
		                "a1": "few friends",
		                "a2": "lots of friends",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": "49",
		                "question": null,
		                "a1": "systematic",
		                "a2": "spontaneous",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 50,
		                "question": null,
		                "a1": "imaginative",
		                "a2": "matter-of-fact",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 51,
		                "question": null,
		                "a1": "warm",
		                "a2": "objective",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 52,
		                "question": null,
		                "a1": "objective",
		                "a2": "passionate",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 53,
		                "question": null,
		                "a1": "build",
		                "a2": "invent",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 54,
		                "question": null,
		                "a1": "quiet",
		                "a2": "gregarious",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 55,
		                "question": null,
		                "a1": "theory",
		                "a2": "fact",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 56,
		                "question": null,
		                "a1": "compassionate",
		                "a2": "logical",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 57,
		                "question": null,
		                "a1": "analytical",
		                "a2": "sentimental",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 58,
		                "question": null,
		                "a1": "sensible",
		                "a2": "fascinating",
		                "v1": "s",
		                "v2": "n"
		              }
		            ]
		          }
		        ]
		      },
		      {
		        "part": [
		          {
		            "id": 3
		          },
		          {
		            "title": "Which answer comes closest to describing how you usually feel or act ?"
		          },
		          {
		            "questions": [
		              {
		                "id": 59,
		                "question": "when you start a big project that is due in a week, do you",
		                "a1": "take time to list separate things to be done and the order of doing them",
		                "a2": "plunge right in",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 60,
		                "question": "in social sitations do you generally find it",
		                "a1": "difficult to start and maintain a conversation with some people",
		                "a2": "easy to talk to most people for long periods of time",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 61,
		                "question": "in doing something that many other people do, does it appeal to you more to",
		                "a1": "do it in the accepted way",
		                "a2": "invent a way of your own",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 62,
		                "question": "can the new people you meet tell what you are interest in",
		                "a1": "right away",
		                "a2": "only after they get to know you",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 63,
		                "question": "do you generally prefer courses that teach",
		                "a1": "concepts and principles",
		                "a2": "facts and figures",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 64,
		                "question": "is it a higher compliment to be called",
		                "a1": "a person of real feeling",
		                "a2": "a consistently reasonable person",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 65,
		                "question": "do you find going by a schedule",
		                "a1": "necessary at time but generally unfavourable",
		                "a2": "helful and favourable most of the time",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 66,
		                "question": "when you are with a group of people, would you usually rather",
		                "a1": "talk individually with people you know well",
		                "a2": "join in the talk of the group",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 67,
		                "question": "at parties do you",
		                "a1": "do much of the talking",
		                "a2": "let others do most of the talking",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 68,
		                "question": "does the idea of making a list of what you should get done over a weekend",
		                "a1": "appeal to you",
		                "a2": "leave you cold",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 69,
		                "question": "which is a higher compliment, to be called",
		                "a1": "competent",
		                "a2": "compassionate",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 70,
		                "question": "do you generally prefer to",
		                "a1": "make your social engagements some distance ahead",
		                "a2": "be free to do thigns on the spur of the moment",
		                "v1": "j",
		                "v2": "p"
		              },
		              {
		                "id": 71,
		                "question": "overall, when working on a big assignement, do you tend to",
		                "a1": "figure out what needs to be done as you go along",
		                "a2": "begin by breaking it down into steps",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 72,
		                "question": "can you keep a conversation going indefinitely",
		                "a1": "only with people who share some interest of yours",
		                "a2": "with almost anyone",
		                "v1": "i",
		                "v2": "e"
		              },
		              {
		                "id": 73,
		                "question": "would you rather",
		                "a1": "support the established methods of doing good",
		                "a2": "analyze what is still wrong and attack unsolved problems",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 74,
		                "question": "in reading for pleasure, do you",
		                "a1": "enjoy odd or original ways of saying things",
		                "a2": "like writers to say exactly what they mean",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 75,
		                "question": "would you rather work under a boss (or teacher) who is",
		                "a1": "good-natured but often inconsistant",
		                "a2": "sharp-tongued but always logical",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 76,
		                "question": "would you prefers to do most things according to",
		                "a1": "however you feel that particular day",
		                "a2": "a set schedule",
		                "v1": "p",
		                "v2": "j"
		              },
		              {
		                "id": 77,
		                "question": "can you",
		                "a1": "talk easily to almost anyone for as long as you have to",
		                "a2": "find a lot to say only to certain people or under certain conditions",
		                "v1": "e",
		                "v2": "i"
		              },
		              {
		                "id": 78,
		                "question": "when making a decision, is it more important to you to",
		                "a1": "weigh the facts",
		                "a2": "consider people feelings and opinions",
		                "v1": "t",
		                "v2": "f"
		              }
		            ]
		          }
		        ]
		      },
		      {
		        "part": [
		          {
		            "id": 4
		          },
		          {
		            "title": "Which word in each pair appeals to you more ? Think about what the words mean, not about how they look or how they sound."
		          },
		          {
		            "questions": [
		              {
		                "id": 79,
		                "question": null,
		                "a1": "imaginative",
		                "a2": "realistic",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 80,
		                "question": null,
		                "a1": "bighearted",
		                "a2": "firm-minded",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 81,
		                "question": null,
		                "a1": "fair-minded",
		                "a2": "caring",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 82,
		                "question": null,
		                "a1": "production",
		                "a2": "design",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 83,
		                "question": null,
		                "a1": "possibilities",
		                "a2": "certainties",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 84,
		                "question": null,
		                "a1": "tenderness",
		                "a2": "strengh",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 85,
		                "question": null,
		                "a1": "pratical",
		                "a2": "sentimental",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 86,
		                "question": null,
		                "a1": "make",
		                "a2": "create",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 87,
		                "question": null,
		                "a1": "novel",
		                "a2": "already known",
		                "v1": "n",
		                "v2": "s"
		              },
		              {
		                "id": 88,
		                "question": null,
		                "a1": "sympathise",
		                "a2": "analyse",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 89,
		                "question": null,
		                "a1": "strong-willed",
		                "a2": "tenderhearted",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 90,
		                "question": null,
		                "a1": "concrete",
		                "a2": "abstract",
		                "v1": "s",
		                "v2": "n"
		              },
		              {
		                "id": 91,
		                "question": null,
		                "a1": "devoted",
		                "a2": "determined",
		                "v1": "f",
		                "v2": "t"
		              },
		              {
		                "id": 92,
		                "question": null,
		                "a1": "competent",
		                "a2": "kindhearted",
		                "v1": "t",
		                "v2": "f"
		              },
		              {
		                "id": 93,
		                "question": null,
		                "a1": "practical",
		                "a2": "innovative",
		                "v1": "s",
		                "v2": "n"
		              }
		            ]
		          }
		        ]
		      }
		    ]
		  }
	    },
	    {
	      "mbti": {
	        "id": 2,
	        "_author": "Abdelkader DJEHAF",
	        "_version": "0.0.1",
	        "_description": "MBTI® Form Q Myers-Briggs Type Indicator ® (MBTI ®) Step II (Form Q). Results fulfill Isabel Myers' plan to provide people with individualized type reports that reflect the distinctive ways they express their type preferences",
	        "_personalityTypes": "E|I , S|N, T|F, J|P",
	        "_keys": "id, question, a1, a2, v1. v2",
	        "_numberOfQuestions": 144
	      }
	    },
	    {
	      "mbti": {
	        "id": 3,
	        "_author": "Abdelkader DJEHAF",
	        "_version": "0.0.1",
	        "_description": "MBTI® Step III Myers-Briggs Type Indicator ® (MBTI ®) Step III (Form M+Q). Analysis actualizes Myers' goal of helping people use their natural types as effectively as possible",
	        "_personalityTypes": "E|I , S|N, T|F, J|P",
	        "_keys": "id, question, a1, a2, v1. v2",
	        "_numberOfQuestions": 222
	      }
	    }
	 ];

    db.collection('mbtis', function(err, collection) {
        collection.insert(mbtis, {safe:true}, function(err, result) {});
    });
 
};