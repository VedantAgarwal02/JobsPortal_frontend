const normalizeText = (text) => {
    // text = text.trim()
    if(!text)
    return ""
    const camelCase =text.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
    let flat=''
    camelCase.forEach(word=>{    
        flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
    }) 

    return flat
}

const camelCaseText = (str)=> {
    let ans = str.toLowerCase()
 
    // Returning string to camelcase
    ans = ans.split(" ").reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

    return ans;
}

module.exports = {normalizeText, camelCaseText}