import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Users = new Mongo.Collection('User');

/** Define a schema to specify the structure of each document in the collection. */
const UserSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: String,
  rating: String,
  status: {
    type: String,
    allowedValues: ['UG-Student', 'G-Student', 'Advisor'],
    defaultValue: 'UG-Student',
  },
  dType: {
    type: String,
    allowedValues: ['BA', 'BS', 'MA', 'MS', 'PhD'],
    defaultValue: 'BS',
  },
  mType: String,
  owner: String,
  fType: {
    type: String,
    allowedValues: ['friend', 'pending'],
  },
  subject: {
    type: String,
    allowedValues: [
      'ICS 111 Introduction to Computer Science',
      'ICS 141 Discrete Mathematics for Computer Science I',
      'ICS 211 Introduction to Computer Science II',
      'ICS 241 Discrete Mathematics for Computer Science II',
      'ICS 212 Program Structure',
      'ICS 235 Machine Learning Methods',
      'ICS 311 Algorithms',
      'ICS 312 Machine-Level and Systems Programming',
      'ICS 313 Programming Language Theory',
      'ICS 314 Software Engineering I',
      'ICS 321 Database Systems I',
      'ICS 331 Logic Design and Microprocessors',
      'ICS 332 Operating Systems',
      'ICS 351 Network Design and Management',
      'ICS 355 Security and Trust I: Resource Protections',
      'ICS 361 Introduction to Artificial Intelligence Programming',
      'ICS 390 Computing Ethics for Lab Assistants',
      'ICS 414 Software Engineering II',
      'ICS 415 Introduction to Programming for the Web',
      'ICS 421 Database Systems II',
      'ICS 422 Network Science Methodology',
      'ICS 423 Data Security and Cryptography I',
      'ICS 424 Application Frameworks',
      'ICS 425 Computer Security and Ethics',
      'ICS 426 Computer System Security',
      'ICS 428 Digital Forensics',
      'ICS 431 Computer Architecture',
      'ICS 432 Concurrent and High-Performance Programming',
      'ICS 435 Machine Learning Fundamentals',
      'ICS 441 Theory of Computation',
      'ICS 442 Analytical Models and methods',
      'ICS 443 Parallel Algorithms',
      'ICS 451 Data Networks',
      'ICS 452 Software Design for Robotics',
      'ICS 455 Security and Trust II: Information Assurance',
      'ICS 461 Artificial Intelligence',
      'ICS 462 Artificial Intelligence for Games',
      'ICS 464 Human Computer Interaction I',
      'ICS 465 Introduction to Hypermedia',
      'ICS 466 Design for Mobile Devices',
      'ICS 471 Probability, Statistics, and Queuing',
      'ICS 475 Introduction to Bioinformatics Sequences and Genomes Analysis',
      'ICS 476 Bioinformatics Algorithms and Tool Development',
      'ICS 481 Introduction to Computer Graphics',
      'ICS 483 Computer Vision',
      'ICS 484 Data Visualization',
      'ICS 485 Video Game Design and Development',
      'ICS 491 Special Topics',
      'ICS 495 Special Topics in Security',
      'ICS 499 Computer Project',
    ],
    defaultValue: '...',
  },
  sensei: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Users.attachSchema(UserSchema);

/** Make the collection and schema available to other code. */
export { Users, UserSchema };
