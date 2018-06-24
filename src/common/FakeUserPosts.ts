const faker = require('faker');
faker.locale = "en";
export const getFakePOstContent = (): string => {
    return faker.lorem.sentence();
}
