import { createStackNavigator } from 'react-navigation';
import LoginForm from '../components/LoginForm';
import EmployeeList from '../components/EmployeeList';

const AppRouteConfigs = createStackNavigator(
  {
    login: { screen: LoginForm },
    employeeList: { screen: EmployeeList }
  },
  {
    initialRouteName: 'login'
  }
);

export default AppRouteConfigs;
