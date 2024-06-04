import { RegisterScene } from "./scenes/register/register.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { DashboardScene } from "./scenes/dashboard/dashboard.scene";
import { NewProductScene } from "./scenes/newProduct/newProduct.scene";
import { UpdateProductScene } from "./scenes/updateProduct/updateProduct.scene";

export const routes = {
    public : [
        {path: '/register', scene: RegisterScene},
        {path: '/login', scene: LoginScene}
    ],

    private: [
        {path: '/dashboard', scene: DashboardScene}
    ],

    admin: [
        {path: '/newProduct', scene: NewProductScene},
        {path: '/updateProduct', scene: UpdateProductScene}
    ]
}