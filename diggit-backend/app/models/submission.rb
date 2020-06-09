class Submission < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :upvotes
end
