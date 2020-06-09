class AddTitleToSubmissions < ActiveRecord::Migration[6.0]
  def change
    add_column :submissions, :title, :string
  end
end
