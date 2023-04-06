class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Night Lovell", "Live Television", "1.png","1.mp3"),
    new Music("Night Lovell", "Dark Night", "3.png","2.mp3"),
    new Music("Host", "Deira City Centre", "2.png","3.mp3")
];