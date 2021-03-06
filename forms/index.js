// import in caolan forms
const session = require("express-session");
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};


const createProductForm = (bed_sizes, mattress_types, bed_orientations, frame_colours, wood_colours, width = "w-8/12") => {
    return forms.create({
        'name': fields.string({
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'weight': fields.string({
            label: 'Weight in kg',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators': [validators.integer(), validators.min(0)]
        }),

        'description': fields.string({
            required: true,
            widget: widgets.textarea({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),

        'stock': fields.string({
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators': [validators.integer(), validators.min(0)]
        }),

        'date': fields.date({
            label: 'Date of creation',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.date(),
            'validators': [validators.date()]
        }),
        
    
        'bed_size_id': fields.string({
            label: 'Bed Sizes',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: bed_sizes
        }),

        'mattress_type_id': fields.string({
            label: 'Mattress Type',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: mattress_types
        }),

        'bed_orientation_id': fields.string({
            label: 'Bed Orientation',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: bed_orientations
        }),

        'frame_colour_id': fields.string({
            label: 'Bed Frame Colour',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: frame_colours
        }),

        'woodColour': fields.string({
            label: 'Wood Panel Colours',
            required: true,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: wood_colours
        }),

        'cost': fields.string({
            label: 'Cost in cents',
            required: true,
            widget: widgets.text({ classes: [width] }),
            validators: [validators.integer(), validators.min(0)],
            errorAfterField: true,
            cssClasses: {
                label:['form-label']
            }
        }), 

        'image_url': fields.string({
            widget: widgets.hidden()
        }),

            
    })
};

const createRegistrationForm = () => {
    return forms.create({
        'username': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'email': fields.email({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label'],
                'validators': [validators.email()]
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'confirm_password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.matchField('password')]
        })
    })
}

const createLoginForm = () => {
    return forms.create({
        'email': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
    })
}

const createSearchForm = (bed_sizes, bed_orientations, mattress_types, frame_colours, wood_colours,width = "w-full") => {
    return forms.create({
        'name': fields.string({
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            }
        }),

        'cost_min': fields.number({
            label: "Minimum cost",
            required: false,
            widget: widgets.text({ classes: [width] }),
            validators: [validators.integer("Minimum cost must be an integer!"),validators.min(0)],
            errorAfterField: true,
            cssClasses: {
              label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
          }),

          'cost_max': fields.number({
            label: "Maximum cost",
            required: false,
            widget: widgets.text({ classes: [width] }),
            validators: [validators.integer("Maximum cost must be an integer!"),validators.min(0)],
            errorAfterField: true,
            cssClasses: {
              label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
          }),

        'bed_size_id': fields.string({
            label: 'Bed Sizes',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: bed_sizes
            

        }),

        'bed_orientation_id': fields.string({
            label: 'Bed Orientation',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: bed_orientations
        }),

        'mattress_type_id': fields.string({
            label: 'Mattress Type',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: mattress_types
        }),


        'frame_colour_id': fields.string({
            label: 'Bed Frame Colour',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: frame_colours
        }),


        'woodColour': fields.string({
            label: 'Wood panel colours',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.multipleSelect(),
            choices: wood_colours
        }),


    })
}

const createSearchOrderForm = (wall_beds, bed_sizes, bed_orientations, mattress_types, frame_colours, wood_colours,width = "w-full") => {
    return forms.create({
        'wall_bed_id': fields.string({
            label: 'Name of Wall Bed',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: wall_beds
        }),


        'bed_size_id': fields.string({
            label: 'Bed Sizes',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: bed_sizes
            

        }),

        'bed_orientation_id': fields.string({
            label: 'Bed Orientation',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: bed_orientations
        }),

        'mattress_type_id': fields.string({
            label: 'Mattress Type',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: mattress_types
        }),


        'frame_colour_id': fields.string({
            label: 'Bed Frame Colour',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: frame_colours
        }),


        'wood_colour_id': fields.string({
            label: 'Wood panel colours',
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: wood_colours
        }),


    })
}

createSearchShipDetailsForm = (statuses ,width = "w-full") => {
    return forms.create({
        'payment_reference': fields.string({
            label: 'Payment Reference',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            
        }),

        'status_id': fields.string({
            label: 'Payment Status',
            required: false,
            widget: widgets.text({ classes: [width] }),
            errorAfterField: true,
            cssClasses: {
                label: ["text-gray-600 ms-2 mt-3 text-lg"],
            },
            widget: widgets.select(),
            choices: statuses
        }),


    })
}
module.exports = { createSearchShipDetailsForm, createSearchOrderForm, createProductForm, bootstrapField, createRegistrationForm, createLoginForm, createSearchForm };