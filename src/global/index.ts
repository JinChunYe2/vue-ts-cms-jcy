import { App } from 'vue'
import registerProperties from './regjster-properties'

export function globalRegister(app: App) {
    app.use(registerProperties)
}
