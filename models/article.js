
const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const DOMPurify = createDomPurify (new JSDOM().window)

const invoiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
   address: {
    type: String,
    required: true
  },
  email: {
   type: String,
   required: true
  },
  phone : {
    type: Number,
    required: true
  },
  description: {
    type: String

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

invoiceSchema.pre('validate', function(next) {
  if (this.title) {
    const timestamp= Date.now();
    this.slug = slugify( `${this.title} -${timestamp}`, { lower: true, strict: true })
  };

  if (this.description) {
    this.sanitizedHtml = DOMPurify.sanitize(this.description)
  }

  next()
})

module.exports = mongoose.model('invoice', invoiceSchema)