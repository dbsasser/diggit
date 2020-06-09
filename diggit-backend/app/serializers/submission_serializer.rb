class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :link, :title
  has_one :category
  has_one :user
  has_many :upvotes
end
