import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import "/imports/api/Datatypes/Datatypes"
import "/imports/api/Datatypes/methods"
import "/imports/api/Datatypes/publications"

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  /*
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }*/


});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: Meteor.settings.github.clientId, // insert your clientId here
      secret: Meteor.settings.github.secret, // insert your secret here
    },
  }
);
