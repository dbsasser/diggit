class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :link
  has_one :category
  has_one :user
end
