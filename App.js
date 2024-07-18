import React from 'react';
import Navigation from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {Loginprovider} from './src/context/login_context';
import {Basicprovider} from './src/context/basic_context';
import {Employeeprovider} from './src/context/employee_context';
import {Vendorprovider} from './src/context/vendor_context';
import {Projectprovider} from './src/context/project_context';

const App = () => {
  return (
    <Loginprovider>
      <Basicprovider>
        <Employeeprovider>
          <Vendorprovider>
            <Projectprovider>
              <Navigation />
            </Projectprovider>
          </Vendorprovider>
        </Employeeprovider>
      </Basicprovider>
    </Loginprovider>
  );
};

export default App;
