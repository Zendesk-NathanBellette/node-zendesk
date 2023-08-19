<div align="center">

[![node-zendesk logo](https://blakmatrix.github.io/node-zendesk/Node_Zendesk_logo.svg "When you realize nothing is lacking, the whole world belongs to you. -Lao Tzu")](https://blakmatrix.github.io/node-zendesk/)

[![npm][npm]][npm-url]

[![node][node]][node-url]
[![licenses][licenses]][licenses-url]
[![PR's welcome][prs]][prs-url]

  <a href="https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates#about-compatibility-scores">
    <img src="https://api.dependabot.com/badges/compatibility_score?dependency-name=node-zendesk&package-manager=npm_and_yarn&previous-version=2.20&new-version=3.0.1">
  </a>
	<a href="https://npmcharts.com/compare/node-zendesk?minimal=true">
		<img src="https://img.shields.io/npm/dm/node-zendesk.svg">
	</a>
	<a href="https://packagephobia.com/result?p=node-zendesk">
		<img src="https://packagephobia.com/badge?p=node-zendesk" alt="install size">
	</a>
	<a href="https://opencollective.com/node-zendesk#backer">
		<img src="https://opencollective.com/node-zendesk/backers/badge.svg">
	</a>
	<a href="https://opencollective.com/node-zendesk#sponsors">
		<img src="https://opencollective.com/node-zendesk/sponsors/badge.svg">
	</a>
	<a href="https://github.com/blakmatrix/node-zendesk/graphs/contributors">
		<img src="https://img.shields.io/github/contributors/blakmatrix/node-zendesk.svg">
	</a>
	<a href="https://github.com/blakmatrix/node-zendesk/discussions">
		<img src="https://img.shields.io/github/discussions/blakmatrix/node-zendesk">
	</a>
  <h1>node-zendesk</h1>
  <p><i>A Zendesk API client library for use with node.js</i></p>
  <p>
    node-zendesk is a versatile gateway between Node.js and the Zendesk Customer Support Platform. Primarily designed for seamless integration with Node.js applications, it also excels in transforming, accessing, and packaging various Zendesk resources and assets. Beyond its core function, it stands ready to bridge the gap between development and Zendesk's powerful capabilities.
  </p>
</div>

**Read the full documentation at [blakmatrix.github.io/node-zendesk/](https://blakmatrix.github.io/node-zendesk/)**

---
## Promise support introduced

Promise support was introduced in @v`2.0.0`, the Legacy version of node-zendesk without Promises @v`1.5.0`

## Install

To use the API, just do the standard

    $ npm install --save node-zendesk


## Example

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.users.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
});
```
or you can use `Promises`, you just need to skip the callback:
```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.users.list()
  .then(function(result) {
    console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
  })
  .catch(function(error) {
    console.log(error);
  });
```
Take a look in the `examples` folder for more examples.

## Contributions

If you're looking to contribute, please refer to the [API Coverage Document](https://github.com/blakmatrix/node-zendesk/blob/master/doc/api-coverage.md), open an issue, or make a PR!

Tests and examples are also welcome.

Zendesk's documentation can be found [here](https://developer.zendesk.com/documentation/).

## 🌟 Support Our Project!

🎉 Join our community of supporters, backers, and sponsors to help fuel the growth and sustainability of our open-source project. Your contribution, no matter the size, makes a meaningful impact:

- **Supporters ($1/month):** Even a small contribution helps us continue our mission. Every dollar adds up!
- **Backers ($5/month):** Take your support up a notch and gain exclusive updates and features.
- **Sponsors ($100/month):** Champion the project's progress, get prominent recognition, and shape its future.

By becoming a supporter, backer, or sponsor, you're investing in the innovation and excellence of our project. Together, we can drive meaningful change and empower developers worldwide.

🚀 [Join Us](https://opencollective.com/node-zendesk) | [Learn More](https://opencollective.com/node-zendesk)


## License

MIT.


[npm]: https://img.shields.io/npm/v/node-zendesk.svg
[npm-url]: https://npmjs.com/package/node-zendesk
[node]: https://img.shields.io/node/v/node-zendesk.svg
[node-url]: https://nodejs.org
[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-url]: https://github.com/blakmatrix/node-zendesk/blob/master/CONTRIBUTING.md
[licenses-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fblakmatrix%2Fnode-zendesk?ref=badge_shield
[licenses]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fblakmatrix%2Fnode-zendesk.svg?type=shield

