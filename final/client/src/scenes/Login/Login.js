import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import config from 'react-global-configuration'
import PropTypes from 'prop-types'

import setAuthorizationToken from '../../utils/setAuthorizationToken'

/*
import CardHeader from '@material-ui/core/CardHeader'

import Modal from 'react-responsive-modal'
import RoleSwitch from './RoleSwitch'
import Pagination from "react-js-pagination"
*/

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  menu: {
    width: 200,
  },
})

class Login extends Component {
  state = {
    email: '',
    password: '',
    rules: {
      email: {
        required: true,
        isEmail: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      password: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
    },
    isLoading: false,
    redirect: false,
  }

  handleChange = name => event => {
    let currentRules = this.state.rules;

    this.setState({
      [name]: event.target.value,
      rules:{
        ...currentRules,
        [name]: {
          ...currentRules[name],
          valid: this.validate(name, event.target.value, currentRules[name]),
          touched: true
        }
      },
    })
  }

  validateRequired(value){
    return typeof value === "string" ?
              value.trim().length > 0 :
              false
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validate(field, value, rules){
    if(rules.required){
      if (!this.validateRequired(value)) {
        rules.helperText = 'Campo obligatorio';
        return false;
      }
    }

    if(rules.isEmail){
      if (!this.validateEmail(value)) {
        rules.helperText = 'Email invalido';
        return false;
      }
    }

    rules.helperText = '';
    return true;
  }

  canSubmit(){
    let formIsValid = true;
    let currentState = this.state;
    let currentRules = this.state.rules;

    for (let f in currentRules){
      formIsValid = currentRules[f].valid && formIsValid;
    }

    this.setState({
      ...currentState,
      formIsValid: formIsValid
    });

    if (!formIsValid) {
      for (let f in currentRules){
        currentRules[f].touched = true;
      }
      this.setState({
        rules: currentRules
      })
      return false;
    }
    return true
  }

  submit() {
    if (!this.canSubmit()) return false

    let credentials = { email: this.state.email, password: this.state.password }
    axios.post('http://localhost:3001/api/accounts/login', credentials)
    .then(res => {
      let token = res.data.id
      axios.get('http://localhost:3001/api/accounts/' + res.data.userId + '?access_token=' + token)
      .then(response => {
        if (response.data.active) {
          localStorage.setItem('jwtToken', token)
          setAuthorizationToken(token)
          this.props.onLogin(res.data)
        } else {
          alert('Usuario inactivo')
          this.setState({ redirect: true })
        }
      })
      .catch(error => {
        alert(JSON.stringify(error))
      })
    })
    .catch(err => {
      alert('Usuario o contraseña incorrectos')
    })
    this.setState({ redirect: true })
  }

  render() {
    let classes = this.props.classes
    let { password, email, isLoading } = this.state

    if (this.state.redirect) {
      return(<Redirect push to="/"/>)
    }

    return(
      <Grid container spacing={24} style={{ padding: 20 }} justify='center'>
        <Card className={classes.card}>
          <form>
          <CardContent>
            <Grid item xl>
              <Typography variant="display3">Login</Typography>
            </Grid>
            <Grid item xl>
                <Grid item>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    error={this.state.rules.email.touched ? !this.state.rules.email.valid : false}
                    helperText={this.state.rules.email.helperText}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="password"
                    label="Contraseña"
                    className={classes.textField}
                    onChange={this.handleChange('password')}
                    type="password"
                    margin="normal"
                    error={this.state.rules.password.touched ? !this.state.rules.password.valid : false}
                    helperText={this.state.rules.password.helperText}
                  />
                </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xl>
              <Link to={'/'}>
                <Button size="large">Cancelar</Button>
              </Link>
              <Button size="large" onClick={() => {this.submit()}}>Login</Button>
            </Grid>
          </CardActions>
        </form>
        </Card>
      </Grid>

    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
