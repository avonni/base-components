import { LightningElement } from 'lwc';

const srcList = [
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
    'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
    'https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300',
    'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
];

export default class ImageBaseWithLazyLoading extends LightningElement {
    src = srcList;

    get itemList() {
        let result = [];
        for (let i = 0; i < this.src.length; i++) {
            let item = {
                key: i,
                src: this.src[i]
            };
            result.push(item);
        }

        return result;
    }
}
