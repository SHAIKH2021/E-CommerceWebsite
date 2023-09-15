export function getCookie(key:string){
    const b= document.cookie.match("(^|;)\\$*"+key+"\\$*=\\$*([^;]+)");
    return b?b.pop():"";
}

export function currencyFormat(amt:number){
    return '$'+(amt/100).toFixed(2);
}