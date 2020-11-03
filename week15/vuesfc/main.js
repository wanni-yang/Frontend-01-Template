  
import { create, Text, Wrapper } from './create'
import {Carousel} from './carousel.toyvue'

let component = < Carousel class = 'carousel' data = {[
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
    ]}/>
component.mountTo(document.body)