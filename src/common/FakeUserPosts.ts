const faker = require('faker');
faker.locale = "en";

export const getFakePostContent = (numberOfPosts: number): string[] => {
    // const res = [...Array(numberOfPosts)].map((asd, i) => {
    //     return faker.lorem.sentence();
    // });
    // return res;
    // console.log(res) -> [ <10 empty items> ] ?? wtf is this?

    const res = [];
    for (let i = 0; i < numberOfPosts; i++) {
        const rSentence = faker.lorem.sentence();
        res.push(rSentence);
    }
    return res;
}
