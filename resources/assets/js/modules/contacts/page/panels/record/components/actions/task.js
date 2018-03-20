import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import {saveActivity} from "../../../../../../activities/service"
import Select from 'react-select'
import DatePicker from '../../../../../../../common/ui/datepicker'

class TaskAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {
        user_id: this.props.user.id,
        person_id: this.props.contact.id,
        deal_id: null,
        company_id: null
      }
    }
  }

  _handleInputChange(event) {
    const { target } = event
    const { name, value } = target
    const { formState } = this.state

    formState[name] = value

    this.setState({
      formState
    });
  }

  _handleContentChange(value) {
    const { formState } = this.state

    formState.description = value

    this.setState({
      formState
    })
  }

  _submit() {
    const { formState } = this.state

    if (typeof formState.details_type === 'undefined') {
      alert('Please select a task type')
    } else {
      this.props.dispatch(saveActivity(formState))
    }
  }

  render() {
    const { contact } = this.props

    const opportunityOptions = contact.opportunities.map(o => ({value: o.id, label: o.name}))
    const companyOptions = contact.companies.map(c => ({value: c.id, label: c.name}))

  	return(
		  <div className="card-body taskActionView">
		  	<div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="task_name">Task Name</label>
			      <input type="text" className="form-control" name="title" placeholder="Enter task name" onChange={this._handleInputChange}/>
			    </div>
			    <div className="form-group col-md-2">
            <label htmlFor="due_date">Task Type</label>
            <select className="form-control" name="details_type" onChange={this._handleInputChange}>
              <option value="">Select...</option>
              <option value="App\CallActivity">Call</option>
              <option value="App\EmailActivity">Email</option>
            </select>
          </div>
          <div className="form-group col-md-4">
			      <label htmlFor="due_date">Due Date</label>
			      <DatePicker className="form-control" name="due_date" placeholder="Enter due date" onChange={this._handleInputChange} />
			    </div>
			  </div>
			  <div className="form-row">
			  	<div className="form-group col">
			  		<ReactQuill onChange={this._handleContentChange} />
			  	</div>
			  </div>
		    <div className="form-row">
		    	<div className="col pt-4">
		    		<button className="btn btn-primary" onClick={this._submit}>Create</button><button className="btn btn-link text-muted">Cancel</button>
		    	</div>

          {opportunityOptions.length ?
            <div className="col">
              <label htmlFor="emailOpportunity">Opportunity</label>
              <Select
                multi={false}
                value={this.state.formState.deal_id}
                onChange={(value) => {
                  const event = {
                    target: {
                      name: 'deal_id',
                      value: value.value
                    }
                  }

                  this._handleInputChange(event)
                }}
                options={opportunityOptions} />
            </div>
            : ''}

          {companyOptions.length ?
            <div className="col">
              <label htmlFor="emailCompany">Company</label>
              <Select
                multi={false}
                value={this.state.formState.company_id}
                onChange={(value) => {
                  const event = {
                    target: {
                      name: 'company_id',
                      value: value.value
                    }
                  }

                  this._handleInputChange(event)
                }}
                options={companyOptions} />
            </div>
            : ''}
		    </div>
		  </div>
		)
 }
}
export default connect(state => ({
  user: state.user
}))(TaskAction)