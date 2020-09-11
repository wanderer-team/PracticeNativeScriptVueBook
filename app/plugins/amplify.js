import Vue from 'nativescript-vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import awsmobild from '@/aws-exports'

Amplify.configure(awsmobild)
Vue.use(AmplifyModules)
