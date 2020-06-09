class User < ApplicationRecord
    has_secure_password
    has_many :submissions
    has_many :upvotes
    validates :username, uniqueness: { case_sensitive: false }
end
