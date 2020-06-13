import React , { Component } from 'react';
import { connect } from 'react-redux'
import { Route , Switch , withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import MealsComponent from './Components/MealsComponent/MealsComponent';

class App extends Component {
  render(){

    return(
      <Layout>
        <div>
          <Switch>
            <Route path="/meals" component={MealsComponent} />
            <Route path="/" component={HomeComponent} />
          </Switch>
        </div>
      </Layout>
      
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
     
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));

