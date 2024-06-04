import { Navbar } from './components/navbar.component.js';
import { routes } from './routes.js';

export function Router(){
    
    const path = window.location.pathname;
    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);
    const adminRoute = routes.admin.find(route => route.path === path);

    if(publicRoute){
        if(!localStorage.getItem('token')){
        publicRoute.scene();
        return;
        } else {
            navigateTo('/dashboard');
            return;
        }   
    } else if (adminRoute) {
        if(localStorage.getItem('token') && localStorage.getItem('role') === 'admin'){
            const { pageContent, logic } = adminRoute.scene();            
            Navbar(pageContent, logic);
            return;
        } else {
            navigateTo('/login');
            return;
        }
    } else if (privateRoute){
        if(localStorage.getItem('token')){
            const { pageContent, logic} = privateRoute.scene();
            Navbar(pageContent, logic);
            return;
        } else {
            navigateTo('/login');
            return;
        } 
    } else {
        navigateTo('/login');
    }
}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router();
};