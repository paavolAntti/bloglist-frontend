
describe('Blog app', function() {
	const baseUrl = 'http://localhost:3003'
	const testUser = {
		name: 'testi ukko',
		username: 'testiukko',
		password: 'salasana'
	}
	const testUser2 = {
		name: 'other man',
		username: 'otheruser',
		password: 'otherword'
	}
	beforeEach(function() {
		cy.request('POST', `${baseUrl}/api/testing/reset`)
		cy.request('POST', `${baseUrl}/api/users`, testUser)
		cy.request('POST', `${baseUrl}/api/users`, testUser2)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.visit('http://localhost:3000')
		cy.contains('login')
		cy.get('#username')
		cy.get('#password')
		cy.get('#login_button')

	})

	describe('login', function () {
		it('succeeds with correct credentials',  function() {
			cy.get('#username').type('testiukko')
			cy.get('#password').type('salasana')
			cy.get('#login_button').click()

			cy.contains('blogs')
			cy.contains('testi ukko logged in')
			cy.get('#logout_button')
			cy.contains('new post')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('nulluser')
			cy.get('#password').type('julkinensana')
			cy.get('#login_button').click()

			cy.get('#notification').contains('invalid username or password')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})

	describe.only('when logged in', function() {
		beforeEach(function() {

			cy.get('#username').type('testiukko')
			cy.get('#password').type('salasana')
			cy.get('#login_button').click()
		})

		it('a blog can be created', function() {
			cy.contains('new post').click()
			cy.get('#title').type('test post')
			cy.get('#author').type('test author')
			cy.get('#url').type('test url')

			cy.get('#post_button').click()
			cy.contains('test post by test author added to bloglist')
			cy.contains('test post / test author')
		})

		it('can be liked', function() {
			cy.contains('new post').click()
			cy.get('#title').type('test post')
			cy.get('#author').type('test author')
			cy.get('#url').type('test url')
			cy.get('#post_button').click()

			cy.get('#view_button').click()
			cy.contains('likes: 0')
			cy.get('#like_button').click()
			cy.contains('likes: 1')
		})

		it('can be removed by the poster', function() {
			cy.contains('new post').click()
			cy.get('#title').type('test post')
			cy.get('#author').type('test author')
			cy.get('#url').type('test url')
			cy.get('#post_button').click()

			cy.get('#view_button').click()
			cy.get('#remove_button').click()

			cy.get('html').should('not.contain', 'test post / test author')
		})

		it('cant`t be removed by other users', function() {
			cy.contains('new post').click()
			cy.get('#title').type('test post')
			cy.get('#author').type('test author')
			cy.get('#url').type('test url')
			cy.get('#post_button').click()

			cy.get('#logout_button').click()

			cy.get('#username').type('otheruser')
			cy.get('#password').type('otherword')
			cy.get('#login_button').click()

			cy.get('#view_button').click()

			cy.get('#remove_button').should('not.exist')
		})

		it('shows blogs in correct order', function() {
			for (let index = 0; index < 3; index++) {
				cy.contains('new post').click()
				cy.get('#title').type(`test post${index}`)
				cy.get('#author').type(`test author${index}`)
				cy.get('#url').type(`test url${index}`)
				cy.get('#post_button').click()
			}

			cy.contains('test post0 / test author0')
				.contains('view').click()

			cy.contains('test post1 / test author1')
				.contains('view').click()

			cy.contains('test post2 / test author2')
				.contains('view').click()

			cy.get('#like_button').click()

			cy.contains('likes: 0')
				.contains('like').click()
				.contains('like').click()
				.contains('like').click()

			cy.contains('likes: 0')
				.contains('like').click()
				.contains('like').click()
				.contains('like').click()
				.contains('like').click()

			cy.contains('test post0 / test author0')
				.contains('hide').click()

			cy.contains('test post1 / test author1')
				.contains('hide').click()

			cy.contains('test post2 / test author2')
				.contains('hide').click()

			cy.get('.blog_container')
				.first()
				.contains('test post2 / test author2')
			cy.get('.blog_container')
				.last()
				.contains('test post0 / test author0')












		})
	})

})