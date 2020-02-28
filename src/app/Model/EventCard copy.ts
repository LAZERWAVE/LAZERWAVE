export class EventCard {
    Id: number;
    Tumbnail: string;
    Title: string;
    Price: number;
    htmlString: string;
    kategori: string;

    public duarBikinHTML():string{
        return  ""+
        //"<a (click)=\"gotoDetail("+event.Id+")\">"+
            "<div (click)=\"gotoDetail("+this.Id+")\" id="+this.Id+" style=\"width:25%; height:500px; cursor:pointer; display:inline-flex; flex-direction:column; margin: 10px; border-radius:10px; border:1px solid grey; padding: 10px;\">"+
                "<img (click)=\"gotoDetail("+1+")\" id="+this.Id+" style=\" border-radius:10px; height:75%; width:100%; margin-bottom:20px;\" src=\""+this.Tumbnail+"\">"+
                "<div (click)=\"gotoDetail("+1+")\" id="+this.Id+" style=\"height:23%; display:flex; flex-direction:column; justify-content: space-between;\">"+
                "<label (click)=\"gotoDetail("+1+")\" id="+this.Id+">"+this.Title+"</label>"+
                //"<hr>"+
                "<div (click)=\"gotoDetail("+1+")\" id="+this.Id+" style=\"display:flex; justify-content: space-between;\">"+
                    "<label>muali dari</label>"+
                    "<label>IDR "+this.Price+"</label>"+
                "</div>"+
                "</div>"+
            "</div>";
        //"</a>";
    }
}